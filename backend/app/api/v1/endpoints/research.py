from fastapi import APIRouter, Query
from backend.app.services.ai_service import ai_service

router = APIRouter()

@router.get("/search")
def search_research_assistant(q: str = Query(..., min_length=2, description="Research search query, e.g., 'AI Agents'")):
    result = ai_service.research_topic(q)
    return {
        "query": q,
        "dossier": result
    }
