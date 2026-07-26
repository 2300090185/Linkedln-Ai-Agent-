from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from backend.app.core.config import settings

router = APIRouter()

class PromptTemplateUpdate(BaseModel):
    id: str
    name: str
    platform: str
    style: str
    template_text: str

@router.get("/sources")
def get_sources():
    return {
        "company_sources": settings.COMPANY_RSS_SOURCES,
        "tech_news_sources": settings.TECH_NEWS_SOURCES,
        "research_publishers": ["arXiv", "Semantic Scholar", "Crossref", "DOAJ", "IEEE Xplore", "ACM Digital Library", "Springer", "Nature", "ScienceDirect"]
    }

@router.get("/prompts")
def get_prompt_templates():
    return {
        "templates": [
            {
                "id": "tpl-001",
                "name": "LinkedIn Thought Leadership Standard",
                "platform": "LinkedIn",
                "style": "Thought Leadership",
                "template_text": "Draft a thought-provoking post highlighting {{topic}} with 3 bullet points and an engagement hook."
            },
            {
                "id": "tpl-002",
                "name": "X Thread Technical Deep Dive",
                "platform": "Twitter/X",
                "style": "Technical",
                "template_text": "Create a 5-tweet technical breakdown of {{topic}} focusing on architectural tradeoffs."
            }
        ]
    }

@router.get("/logs")
def get_system_logs():
    return {
        "logs": [
            {"timestamp": "2026-07-22 18:00:00", "level": "INFO", "source": "NewsService", "message": "Successfully ingested 35 articles from 12 RSS feeds."},
            {"timestamp": "2026-07-22 17:45:00", "level": "INFO", "source": "AIService", "message": "Gemini 2.5 Flash generated LinkedIn post (Latency: 420ms)."},
            {"timestamp": "2026-07-22 16:30:00", "level": "INFO", "source": "ResearchService", "message": "arXiv API sync complete. Ingested 10 papers for query 'cs.AI'."}
        ]
    }

@router.get("/announcements")
def get_announcements():
    return {
        "announcements": [
            {
                "id": "anc-001",
                "title": "Gemini 2.5 Flash Engine Integration Active",
                "content": "All AI explanations and post generation features now run on Google Gemini 2.5 Flash for high-speed response.",
                "created_at": "2026-07-22T00:00:00Z"
            }
        ]
    }
