import os
from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Content Intelligence Platform"
    API_V1_STR: str = "/api/v1"
    
    # AI Engine Settings
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    
    # Auth & Security
    SECRET_KEY: str = os.getenv("JWT_SECRET", "super-secret-jwt-token-key-for-ai-platform-2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    
    # Supabase / DB
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./history/history.db")
    
    # RSS Sources (Tech Companies & News Sites)
    COMPANY_RSS_SOURCES: List[dict] = [
        {"name": "OpenAI", "url": "https://openai.com/blog/rss.xml", "category": "AI Research"},
        {"name": "Google AI", "url": "https://blog.google/technology/ai/rss/", "category": "AI Research"},
        {"name": "Microsoft AI", "url": "https://blogs.microsoft.com/ai/feed/", "category": "AI Research"},
        {"name": "NVIDIA", "url": "https://blogs.nvidia.com/feed/", "category": "Hardware & AI"},
        {"name": "Hugging Face", "url": "https://huggingface.co/blog/feed.xml", "category": "Open Source AI"},
        {"name": "Meta AI", "url": "https://ai.meta.com/blog/rss/", "category": "AI Research"},
        {"name": "GitHub Blog", "url": "https://github.blog/feed/", "category": "Developer Tools"}
    ]
    
    TECH_NEWS_SOURCES: List[dict] = [
        {"name": "TechCrunch AI", "url": "https://techcrunch.com/category/artificial-intelligence/feed/", "category": "Tech News"},
        {"name": "VentureBeat AI", "url": "https://venturebeat.com/category/ai/feed/", "category": "Tech News"},
        {"name": "The Verge", "url": "https://www.theverge.com/rss/index.xml", "category": "Tech News"},
        {"name": "MIT Tech Review", "url": "https://www.technologyreview.com/feed/", "category": "Academic Tech"},
        {"name": "InfoQ AI", "url": "https://feed.infoq.com/ai-ml-data-eng", "category": "Software Engineering"}
    ]
    
    class Config:
        case_sensitive = True

settings = Settings()
