from fastapi import APIRouter, Query
from typing import Optional
from backend.app.services.research_service import research_service
from backend.app.services.ai_service import ai_service
from pydantic import BaseModel

router = APIRouter()

class ExplainPaperRequest(BaseModel):
    title: str
    abstract: str
    publisher: Optional[str] = "arXiv"

@router.get("/")
async def get_papers(query: Optional[str] = "cs.AI", limit: int = 10):
    papers = await research_service.fetch_papers(query=query, max_results=limit)
    return {
        "query": query,
        "count": len(papers),
        "publishers": ["arXiv", "Semantic Scholar", "Crossref", "DOAJ", "IEEE Xplore", "ACM Digital Library", "Springer", "Nature"],
        "papers": papers
    }

@router.post("/explain")
def explain_paper(req: ExplainPaperRequest):
    explanation = ai_service.explain_content(title=req.title, content=req.abstract, source=req.publisher)
    return {
        "paper_title": req.title,
        "explanation": explanation
    }
