from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from backend.app.services.ai_service import ai_service

router = APIRouter()

class GeneratePostRequest(BaseModel):
    topic: str
    description: Optional[str] = ""
    platform: str = "LinkedIn" # 'LinkedIn', 'Twitter/X', 'Blog', 'Newsletter', 'Instagram'
    writing_style: str = "Professional" # 'Professional', 'Educational', 'Storytelling', 'Technical', 'Thought Leadership', 'Recruiter Friendly', 'Student Friendly'

@router.post("/generate")
def generate_social_post(req: GeneratePostRequest):
    result = ai_service.generate_social_post(
        title=req.topic,
        description=req.description,
        platform=req.platform,
        writing_style=req.writing_style
    )
    return {
        "status": "success",
        "generated_post": result
    }

@router.get("/history")
def get_post_history():
    return {
        "posts": [
            {
                "id": "post-001",
                "topic": "Gemini 2.5 Flash Production Deployment",
                "platform": "LinkedIn",
                "writing_style": "Educational",
                "headline": "🚀 How Gemini 2.5 Flash Cut Our Inference Latency by 45%",
                "content": "Building real-time AI agents requires sub-second response times. Here is how we benchmarked and deployed Gemini 2.5 Flash...",
                "status": "published",
                "created_at": "2026-07-22T14:00:00Z"
            },
            {
                "id": "post-002",
                "topic": "Autonomous Agent Swarms Architecture",
                "platform": "Twitter/X",
                "writing_style": "Technical",
                "headline": "🧵 1/5 The Architecture of Autonomous Agent Swarms",
                "content": "1/5 How do you orchestrate 1,000+ AI agents without memory leakage? Let's break down asynchronous state dispatchers 👇",
                "status": "draft",
                "created_at": "2026-07-21T09:30:00Z"
            },
            {
                "id": "post-003",
                "topic": "Next.js App Router & FastAPI Integration",
                "platform": "Blog",
                "writing_style": "Thought Leadership",
                "headline": "Building High Performance AI Platform Dashboards in 2026",
                "content": "# Executive Guide: Combining FastAPI Backends with Next.js App Router...",
                "status": "draft",
                "created_at": "2026-07-20T16:45:00Z"
            }
        ]
    }
