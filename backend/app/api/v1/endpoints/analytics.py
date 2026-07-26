from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_analytics_dashboard():
    return {
        "kpis": {
            "articles_read": 34,
            "posts_generated": 18,
            "topics_explored": 12,
            "total_reading_time_hours": 4.5,
            "learning_streak_days": 12
        },
        "weekly_activity": [
            {"day": "Mon", "reading_minutes": 25, "posts_generated": 2},
            {"day": "Tue", "reading_minutes": 40, "posts_generated": 4},
            {"day": "Wed", "reading_minutes": 30, "posts_generated": 3},
            {"day": "Thu", "reading_minutes": 50, "posts_generated": 5},
            {"day": "Fri", "reading_minutes": 20, "posts_generated": 1},
            {"day": "Sat", "reading_minutes": 15, "posts_generated": 1},
            {"day": "Sun", "reading_minutes": 35, "posts_generated": 2}
        ],
        "category_distribution": [
            {"name": "Artificial Intelligence", "value": 40},
            {"name": "Cloud & Infrastructure", "value": 25},
            {"name": "Software Engineering", "value": 20},
            {"name": "Cybersecurity", "value": 15}
        ],
        "top_explored_topics": [
            {"topic": "AI Agents & Swarms", "reads": 14},
            {"topic": "Gemini 2.5 Flash", "reads": 10},
            {"topic": "FastAPI & Supabase", "reads": 8},
            {"topic": "PyTorch 2.4", "reads": 6}
        ]
    }
