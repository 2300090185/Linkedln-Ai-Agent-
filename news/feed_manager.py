import logging
from typing import List, Dict, Any
from news.rss_reader import RSSReader
from config import Config

logger = logging.getLogger(__name__)

class FeedManager:
    def __init__(self, feed_urls: List[str] = None):
        self.feed_urls = feed_urls if feed_urls else Config.DEFAULT_RSS_FEEDS

    def fetch_all(self) -> List[Dict[str, Any]]:
        all_articles = []
        for url in self.feed_urls:
            reader = RSSReader(url)
            articles = reader.fetch_news()
            logger.info(f"Fetched {len(articles)} articles from {url}")
            all_articles.extend(articles)
        
        logger.info(f"Total fetched articles: {len(all_articles)}")
        return all_articles
