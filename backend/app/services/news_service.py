import feedparser
import hashlib
import logging
from typing import List, Dict, Any
from datetime import datetime
from backend.app.core.config import settings

logger = logging.getLogger(__name__)

class NewsService:
    def __init__(self):
        self.company_sources = settings.COMPANY_RSS_SOURCES
        self.tech_sources = settings.TECH_NEWS_SOURCES

    def _generate_hash(self, title: str, url: str) -> str:
        return hashlib.sha256(f"{title}:{url}".encode('utf-8')).hexdigest()

    def fetch_latest_news(self, category: str = None) -> List[Dict[str, Any]]:
        all_sources = self.company_sources + self.tech_sources
        articles = []

        for source in all_sources:
            try:
                feed = feedparser.parse(source["url"])
                for entry in feed.entries[:5]: # top 5 items per source
                    title = entry.get("title", "Untitled News")
                    link = entry.get("link", "#")
                    summary = entry.get("summary", entry.get("description", ""))
                    pub_date = entry.get("published", entry.get("updated", str(datetime.now())))
                    
                    content_hash = self._generate_hash(title, link)
                    
                    article_item = {
                        "id": content_hash[:16],
                        "title": title,
                        "description": summary[:300] + "..." if len(summary) > 300 else summary,
                        "content": summary,
                        "url": link,
                        "source_name": source["name"],
                        "source_category": "Tech Company" if source in self.company_sources else "Tech Website",
                        "published_date": pub_date,
                        "content_hash": content_hash,
                        "reading_time_minutes": max(3, len(summary.split()) // 50),
                        "difficulty_level": "Intermediate",
                        "tags": [source["name"], source.get("category", "Technology")]
                    }
                    articles.append(article_item)
            except Exception as e:
                logger.error(f"Error fetching RSS for {source['name']}: {e}")

        # Fallback items if RSS feeds offline or empty
        if not articles:
            articles = self._get_fallback_news()

        return articles

    def _get_fallback_news(self) -> List[Dict[str, Any]]:
        return [
            {
                "id": "art-001",
                "title": "OpenAI Unveils Autonomous Agent Swarm Architecture",
                "description": "A new paradigm in AI orchestration allowing asynchronous agent communication and cross-modal task synthesis.",
                "content": "OpenAI has officially documented the architecture behind autonomous agent swarms...",
                "url": "https://openai.com/blog",
                "source_name": "OpenAI",
                "source_category": "Tech Company",
                "published_date": "2026-07-22T10:00:00Z",
                "content_hash": "hash_openai_swarm_001",
                "reading_time_minutes": 6,
                "difficulty_level": "Expert",
                "tags": ["OpenAI", "AI Agents", "Architecture"]
            },
            {
                "id": "art-002",
                "title": "Google AI Announces Gemini 2.5 Multi-Modal Speed Benchmarks",
                "description": "Gemini 2.5 Flash reduces inference latency by 45% while achieving state-of-the-art benchmarks on code and reasoning tasks.",
                "content": "Google AI team released detailed benchmarks comparing Gemini 2.5 Flash with existing models...",
                "url": "https://blog.google/technology/ai/",
                "source_name": "Google AI",
                "source_category": "Tech Company",
                "published_date": "2026-07-21T15:30:00Z",
                "content_hash": "hash_google_gemini_002",
                "reading_time_minutes": 4,
                "difficulty_level": "Intermediate",
                "tags": ["Google AI", "Gemini", "LLM"]
            },
            {
                "id": "art-003",
                "title": "NVIDIA Blackwell GPUs Reach Production Availability for Enterprise AI",
                "description": "NVIDIA announces full production rollout for Blackwell architecture, featuring 5x inference speeds for 100B+ parameter models.",
                "content": "Enterprise datacenters receive initial shipments of Blackwell GPUs designed for multi-node AI training...",
                "url": "https://blogs.nvidia.com/",
                "source_name": "NVIDIA",
                "source_category": "Tech Company",
                "published_date": "2026-07-20T08:00:00Z",
                "content_hash": "hash_nvidia_blackwell_003",
                "reading_time_minutes": 5,
                "difficulty_level": "Intermediate",
                "tags": ["NVIDIA", "Hardware", "Cloud"]
            },
            {
                "id": "art-004",
                "title": "MIT Technology Review: The Rise of Real-Time Enterprise AI Workflows",
                "description": "How leading Fortune 500 tech teams integrate autonomous agents into daily software release cycles.",
                "content": "Engineering organizations are redesigning CI/CD pipelines around AI verification steps...",
                "url": "https://www.technologyreview.com/",
                "source_name": "MIT Tech Review",
                "source_category": "Tech Website",
                "published_date": "2026-07-19T12:00:00Z",
                "content_hash": "hash_mit_review_004",
                "reading_time_minutes": 7,
                "difficulty_level": "Beginner",
                "tags": ["MIT Tech Review", "DevOps", "Enterprise"]
            }
        ]

news_service = NewsService()
