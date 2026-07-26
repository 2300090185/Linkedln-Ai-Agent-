from fastapi import APIRouter, Query
from typing import List, Optional
from backend.app.services.news_service import news_service
from backend.app.services.research_service import research_service

router = APIRouter()

@router.get("/")
async def get_personalized_feed(
    domain: Optional[str] = None,
    category: Optional[str] = None
):
    news = news_service.fetch_latest_news()
    papers = await research_service.fetch_papers(query=domain if domain else "AI")
    
    if domain and domain.lower() != "all":
        news = [n for n in news if any(domain.lower() in t.lower() for t in n.get("tags", []))]
    
    return {
        "personalized_domain": domain or "All Selected Domains",
        "total_items": len(news) + len(papers),
        "latest_news": news,
        "research_papers": papers[:4],
        "trending_topics": [
            {"name": "Autonomous Agent Swarms", "growth": "+184%", "category": "AI Architecture"},
            {"name": "Gemini 2.5 Flash API", "growth": "+142%", "category": "LLM Infrastructure"},
            {"name": "Edge Quantized RAG", "growth": "+96%", "category": "Data Science"},
            {"name": "Zero-Shot Code Verification", "growth": "+88%", "category": "Software Engineering"}
        ],
        "recommended_courses": [
            {"title": "Production AI Agents Masterclass", "provider": "DeepLearning.AI", "duration": "4 hours", "level": "Advanced"},
            {"title": "FastAPI & Supabase High Scale Architecture", "provider": "Coursera", "duration": "6 hours", "level": "Intermediate"}
        ]
    }
