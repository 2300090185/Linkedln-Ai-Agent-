from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from backend.app.services.news_service import news_service
from backend.app.services.ai_service import ai_service

router = APIRouter()

class ExplainRequest(BaseModel):
    title: str
    content: str
    source: Optional[str] = ""

@router.get("/")
def get_news(category: Optional[str] = None):
    articles = news_service.fetch_latest_news()
    if category and category.lower() != "all":
        articles = [a for a in articles if a.get("source_category", "").lower() == category.lower()]
    return {
        "count": len(articles),
        "articles": articles
    }

@router.post("/explain")
def explain_article(req: ExplainRequest):
    explanation = ai_service.explain_content(title=req.title, content=req.content, source=req.source)
    return {
        "article_title": req.title,
        "explanation": explanation
    }
