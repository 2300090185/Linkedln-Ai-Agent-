import sqlite3
import hashlib
from datetime import datetime, timedelta
import logging
from typing import List, Optional
from config import Config
from database.models import Article, Post, History
import os

logger = logging.getLogger(__name__)

class Database:
    def __init__(self, db_path: str = Config.DB_PATH):
        self.db_path = db_path
        # Ensure directory exists
        db_dir = os.path.dirname(self.db_path)
        if db_dir and not os.path.exists(db_dir):
            os.makedirs(db_dir, exist_ok=True)
        self._init_db()

    def get_connection(self):
        return sqlite3.connect(self.db_path)

    def _init_db(self):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            # Articles Table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS articles (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    description TEXT,
                    url TEXT UNIQUE NOT NULL,
                    published_date TEXT,
                    source TEXT,
                    content_hash TEXT UNIQUE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            # Posts Table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS posts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    article_id INTEGER NOT NULL,
                    draft_content TEXT NOT NULL,
                    status TEXT DEFAULT 'pending',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY(article_id) REFERENCES articles(id)
                )
            ''')
            # History Table (for 30-day duplicates)
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS history (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    topic_hash TEXT UNIQUE NOT NULL,
                    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            conn.commit()
            
    def add_article(self, article: Article) -> Optional[int]:
        try:
            with self.get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    "INSERT INTO articles (title, description, url, published_date, source, content_hash) VALUES (?, ?, ?, ?, ?, ?)",
                    (article.title, article.description, article.url, article.published_date, article.source, article.content_hash)
                )
                conn.commit()
                return cursor.lastrowid
        except sqlite3.IntegrityError:
            logger.debug(f"Article already exists (duplicate URL or Hash): {article.url}")
            try:
                with self.get_connection() as conn:
                    cursor = conn.cursor()
                    cursor.execute("SELECT id FROM articles WHERE url = ? OR content_hash = ?", (article.url, article.content_hash))
                    row = cursor.fetchone()
                    return row[0] if row else None
            except Exception as e:
                logger.error(f"Error fetching existing article ID: {e}")
                return None

    def is_topic_recent(self, topic_hash: str, days: int = 30) -> bool:
        """Check if a topic hash exists in history within the last `days` days."""
        threshold_date = datetime.now() - timedelta(days=days)
        with self.get_connection() as conn:
            cursor = conn.cursor()
            # Format datetime for sqlite
            cursor.execute(
                "SELECT 1 FROM history WHERE topic_hash = ? AND published_at >= ?",
                (topic_hash, threshold_date.strftime("%Y-%m-%d %H:%M:%S"))
            )
            return cursor.fetchone() is not None
            
    def record_history(self, topic_hash: str):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT OR REPLACE INTO history (topic_hash, published_at) VALUES (?, ?)",
                (topic_hash, datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
            )
            conn.commit()
            
    def get_pending_posts(self) -> List[Post]:
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, article_id, draft_content, status, created_at FROM posts WHERE status = 'pending'")
            rows = cursor.fetchall()
            return [Post(id=r[0], article_id=r[1], draft_content=r[2], status=r[3], created_at=r[4]) for r in rows]

    def add_post(self, post: Post) -> Optional[int]:
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO posts (article_id, draft_content, status) VALUES (?, ?, ?)",
                (post.article_id, post.draft_content, post.status)
            )
            conn.commit()
            return cursor.lastrowid
