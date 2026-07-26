from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter()

class BookmarkItem(BaseModel):
    item_id: str
    item_type: str # 'article' or 'paper'
    title: str
    url: str

@router.get("/hub")
def get_learning_hub_summary():
    return {
        "learning_streak_days": 12,
        "completed_articles_count": 28,
        "saved_papers_count": 14,
        "weekly_reading_goal_minutes": 120,
        "weekly_reading_completed_minutes": 85,
        "completed_history": [
            {
                "id": "art-001",
                "title": "OpenAI Unveils Autonomous Agent Swarm Architecture",
                "completed_at": "2026-07-22T11:20:00Z",
                "time_spent_minutes": 6,
                "category": "AI Research"
            },
            {
                "id": "art-002",
                "title": "Google AI Announces Gemini 2.5 Multi-Modal Speed Benchmarks",
                "completed_at": "2026-07-21T18:40:00Z",
                "time_spent_minutes": 5,
                "category": "LLM Infrastructure"
            },
            {
                "id": "art-003",
                "title": "NVIDIA Blackwell GPUs Reach Production Availability",
                "completed_at": "2026-07-20T14:15:00Z",
                "time_spent_minutes": 7,
                "category": "Cloud Computing"
            }
        ],
        "bookmarks": [
            {
                "id": "bm-001",
                "title": "Zero-Shot Formal Verification of LLM Code Output",
                "type": "Research Paper",
                "publisher": "ACM Digital Library",
                "url": "https://dl.acm.org",
                "saved_at": "2026-07-22T08:00:00Z"
            },
            {
                "id": "bm-002",
                "title": "FastAPI & Supabase High Scale Architecture Guide",
                "type": "Article",
                "publisher": "InfoQ",
                "url": "https://infoq.com",
                "saved_at": "2026-07-21T10:30:00Z"
            }
        ]
    }

@router.post("/bookmarks")
def add_bookmark(item: BookmarkItem):
    return {
        "status": "success",
        "message": f"Added '{item.title}' to bookmarks",
        "bookmark": item.dict()
    }
