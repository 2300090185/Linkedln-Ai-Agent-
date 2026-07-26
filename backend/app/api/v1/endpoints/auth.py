from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from backend.app.core.security import create_access_token

router = APIRouter()

class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = "Tech Professional"
    email: Optional[str] = "user@platform.ai"
    role: Optional[str] = "developer"
    target_audience: Optional[str] = "Tech Professionals & Hiring Managers"
    domains: List[str] = ["Artificial Intelligence", "Machine Learning", "Cloud Computing", "Python", "DevOps"]

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(req: LoginRequest):
    token = create_access_token(subject=req.email)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": "usr-001",
            "email": req.email,
            "full_name": "Demo Professional",
            "role": "admin",
            "domains": ["Artificial Intelligence", "Machine Learning", "Cloud Computing", "Python"]
        }
    }

@router.post("/onboarding")
def save_onboarding_domains(payload: UserProfileUpdate):
    return {
        "status": "success",
        "message": "User preferences updated successfully",
        "profile": payload.dict()
    }

@router.get("/me")
def get_current_user_profile():
    return {
        "id": "usr-001",
        "email": "sarannc@platform.ai",
        "full_name": "Saran Krishna",
        "role": "admin",
        "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        "target_audience": "Software Engineers, Researchers & Founders",
        "domains": [
            "Artificial Intelligence",
            "Machine Learning",
            "Data Science",
            "Cybersecurity",
            "Cloud Computing",
            "AWS",
            "DevOps",
            "Kubernetes",
            "Docker",
            "Python",
            "React",
            "Software Engineering"
        ]
    }
