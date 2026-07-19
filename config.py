import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Central configuration class."""
    
    # API Keys
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    
    # Telegram settings
    TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
    TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")
    
    # Email settings
    SMTP_SERVER = os.getenv("SMTP_SERVER") or "smtp.gmail.com"
    _port = os.getenv("SMTP_PORT")
    SMTP_PORT = int(_port) if _port and _port.strip() else 587
    SMTP_USERNAME = os.getenv("SMTP_USERNAME")
    SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
    RECIPIENT_EMAIL = os.getenv("RECIPIENT_EMAIL")
    
    # Database path
    DB_PATH = os.getenv("DB_PATH") or "history/history.db"
    
    # Default RSS Sources if not defined elsewhere
    DEFAULT_RSS_FEEDS = [
        "https://openai.com/blog/rss.xml",
        "https://blog.google/technology/ai/rss/",
        "https://techcrunch.com/category/artificial-intelligence/feed/",
        "https://venturebeat.com/category/ai/feed/"
    ]

# Validate crucial variables during startup
if not Config.GEMINI_API_KEY:
    import logging
    logging.warning("GEMINI_API_KEY is not set. The LLM agents will fail to run.")
