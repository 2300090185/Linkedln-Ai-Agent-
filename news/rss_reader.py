import feedparser
import logging
import hashlib
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

class RSSReader:
    def __init__(self, url: str):
        self.url = url

    def generate_hash(self, text: str) -> str:
        """Generate a stable hash for checking duplicates."""
        return hashlib.sha256(text.encode('utf-8')).hexdigest()

    def fetch_news(self) -> List[Dict[str, Any]]:
        logger.info(f"Fetching RSS feed from: {self.url}")
        try:
            feed = feedparser.parse(self.url)
            articles = []
            source_title = feed.feed.get('title', 'Unknown Source')
            
            for entry in feed.entries:
                title = entry.get('title', '')
                description = entry.get('description', '')
                # fallback for missing description
                if not description and 'summary' in entry:
                    description = entry.get('summary', '')

                link = entry.get('link', '')
                
                # Some feeds use different fields for published date
                published = entry.get('published', entry.get('updated', ''))
                
                if not title or not link:
                    continue
                    
                content_hash = self.generate_hash(f"{title}{link}")
                
                articles.append({
                    'title': title,
                    'description': description,
                    'url': link,
                    'published_date': published,
                    'source': source_title,
                    'content_hash': content_hash
                })
            return articles
        except Exception as e:
            logger.error(f"Error fetching {self.url}: {e}")
            return []
