from dataclasses import dataclass
from datetime import datetime
from typing import Optional

@dataclass
class Article:
    title: str
    description: str
    url: str
    published_date: str
    source: str
    content_hash: str
    id: Optional[int] = None
    created_at: Optional[datetime] = None

@dataclass
class Post:
    article_id: int
    draft_content: str
    status: str = "pending" # pending, approved, published
    id: Optional[int] = None
    created_at: Optional[datetime] = None

@dataclass
class History:
    topic_hash: str
    published_at: datetime
    id: Optional[int] = None
