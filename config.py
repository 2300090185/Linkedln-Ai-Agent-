import os
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """
    Central configuration class mapping the environment variables:
    - GEMINI_API_KEY: Authentication for Gemini LLM model services.
    - TELEGRAM_BOT_TOKEN: Bot token for manual review draft messages.
    - TELEGRAM_CHAT_ID: Specific Telegram chat or channel ID.
    - SMTP_SERVER: Email transfer server address (defaults to smtp.gmail.com).
    - SMTP_PORT: Port number for secure email connection (defaults to 587).
    - SMTP_USERNAME: Sender email address to log in and dispatch drafts.
    - SMTP_PASSWORD: 16-character secure App Password for Gmail.
    - RECIPIENT_EMAIL: Recipient inbox address for LinkedIn post drafts.
    - DB_PATH: Database file path to store article deduplication history.
    """
    
    # API Keys
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    
    # Telegram settings
    TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
    TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")
    
    # Email settings
    SMTP_SERVER = os.getenv("SMTP_SERVER") or "smtp.gmail.com"
    _port = os.getenv("SMTP_PORT")
    SMTP_PORT = int(_port) if _port and _port.strip() else 587
    SMTP_USERNAME = os.getenv("SMTP_USERNAME") or "krishnasarannc@gmail.com"
    SMTP_PASSWORD = os.getenv("SMTP_PASSWORD") or os.getenv("EMAIL_NOTIFICATION_SECRET")
    RECIPIENT_EMAIL = os.getenv("RECIPIENT_EMAIL") or "krishnasarannc@gmail.com"
    
    # Database path
    DB_PATH = os.getenv("DB_PATH") or "history/history.db"
    
    # Default RSS Sources if not defined elsewhere
    DEFAULT_RSS_FEEDS = [
        "https://openai.com/blog/rss.xml",
        "https://blog.google/technology/ai/rss/",
        "https://techcrunch.com/category/artificial-intelligence/feed/",
        "https://venturebeat.com/category/ai/feed/",
        "https://techcrunch.com/feed/",
        "https://www.theverge.com/rss/index.xml",
        "https://www.wired.com/feed/rss",
        "https://news.ycombinator.com/rss"
    ]

# Validate crucial variables during startup
if not Config.GEMINI_API_KEY:
    import logging
    logging.warning("GEMINI_API_KEY is not set. The LLM agents will fail to run.")
