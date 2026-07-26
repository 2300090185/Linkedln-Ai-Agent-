from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.core.config import settings
from backend.app.api.v1.endpoints import (
    auth, feed, news, papers, generator, research, learning, analytics, admin
)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Production REST API for AI Content Intelligence Platform powered by Gemini 2.5 Flash",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["Authentication & Profile"])
app.include_router(feed.router, prefix=f"{settings.API_V1_STR}/feed", tags=["Personalized Feed"])
app.include_router(news.router, prefix=f"{settings.API_V1_STR}/news", tags=["Latest Tech News"])
app.include_router(papers.router, prefix=f"{settings.API_V1_STR}/papers", tags=["Research Papers"])
app.include_router(generator.router, prefix=f"{settings.API_V1_STR}/generator", tags=["AI Post Generator"])
app.include_router(research.router, prefix=f"{settings.API_V1_STR}/research", tags=["AI Research Assistant"])
app.include_router(learning.router, prefix=f"{settings.API_V1_STR}/learning", tags=["Learning Hub"])
app.include_router(analytics.router, prefix=f"{settings.API_V1_STR}/analytics", tags=["Analytics Dashboard"])
app.include_router(admin.router, prefix=f"{settings.API_V1_STR}/admin", tags=["Admin Panel"])

@app.get("/")
def root():
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "version": "2.0.0",
        "docs": "/docs"
    }
