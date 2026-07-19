import logging
from typing import List
from news.feed_manager import FeedManager
from database.database import Database
from database.models import Article

logger = logging.getLogger(__name__)

class ResearchAgent:
    def __init__(self, db: Database, feed_urls: List[str] = None):
        self.db = db
        self.feed_manager = FeedManager(feed_urls)

    def collect_and_filter_news(self) -> List[Article]:
        """
        Fetches news from all configured sources and filters out items
        that have already been processed or are duplicates of recent topics.
        """
        raw_articles = self.feed_manager.fetch_all()
        new_articles = []
        
        for raw in raw_articles:
            # Check 30-day rule for duplicate topics (using content hash for now)
            # A more advanced version might use LLM to generate a semantic hash,
            # but standard content hash works as a baseline for exact duplicates.
            
            if self.db.is_topic_recent(raw['content_hash'], days=30):
                logger.debug(f"Article skipped (Topic recently published): {raw['title']}")
                continue
                
            article = Article(
                title=raw['title'],
                description=raw['description'],
                url=raw['url'],
                published_date=raw['published_date'],
                source=raw['source'],
                content_hash=raw['content_hash']
            )
            
            # Save to DB to avoid duplicate fetching later
            article_id = self.db.add_article(article)
            if article_id:
                article.id = article_id
                new_articles.append(article)
                
        logger.info(f"Research agent found {len(new_articles)} new unique articles.")
        return new_articles
