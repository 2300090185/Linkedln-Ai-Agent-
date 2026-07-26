# AI Content Intelligence Platform

A production-ready, full-stack AI Content Intelligence Platform powered by **Next.js 14**, **FastAPI**, **PostgreSQL (Supabase)**, and **Google Gemini 2.5 Flash**.

This platform helps developers, researchers, students, HR teams, content creators, and enterprise professionals stay updated with tech news, discover research papers, learn trending technologies, generate multi-platform social posts, and track learning progress with interactive analytics.

---

## Key Features

* 🚀 **Personalized Feed & Onboarding**: Multi-domain interest selection (27+ domains including AI, ML, Cloud, DevOps, Python, React, FinTech, Cybersecurity, etc.).
* 📰 **Trusted News Aggregation**: Real-time feeds from top tech companies (OpenAI, Google AI, Microsoft, NVIDIA, Meta, Hugging Face, GitHub) and tech publishers (TechCrunch, VentureBeat, The Verge, MIT Tech Review, InfoQ).
* 🔬 **Academic Research Discovery**: Search & explore verified research papers from arXiv, Semantic Scholar, IEEE Xplore, ACM Digital Library, DOAJ, and Crossref.
* 🧠 **AI Learning Assistant**: 3-tier difficulty breakdowns for every article/paper (**Beginner**, **Intermediate**, **Expert Deep-Dive**), key takeaways, real-world applications, and suggested learning roadmaps.
* ✍️ **AI Social Post Generator**: Draft high-engagement content for **LinkedIn**, **Twitter/X Threads**, **Blog Outlines**, **Newsletter Drafts**, and **Instagram Captions** across 7 writing tones (**Professional**, **Educational**, **Storytelling**, **Technical**, **Thought Leadership**, **Recruiter Friendly**, **Student Friendly**).
* 🔍 **AI Research Assistant**: Unified multi-source search synthesizing news, papers, GitHub open-source repositories, conference talks, documentation, and books into an executive dossier.
* 🎓 **Learning Hub & Streak Tracker**: Track completed articles, weekly reading targets, bookmarks, and active learning streaks.
* 📊 **Analytics Dashboard**: Recharts-powered metrics for reading duration, category distribution, posts generated, and weekly activity.
* 🛡️ **Admin Panel**: Manage RSS sources, customize AI prompt templates, review system execution logs, and post platform announcements.
* 🔄 **Backward Compatibility**: Fully preserves the existing CLI script (`app.py`), multi-agent research pipeline (`agents/`), SQLite storage, and direct Telegram notifications.

---

## Tech Stack

* **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons, Recharts, Framer Motion
* **Backend**: FastAPI (Python 3.12), Pydantic v2, Google Gemini 2.5 Flash (`google-genai` SDK), PyJWT, feedparser, httpx
* **Database**: PostgreSQL (Supabase schema) with fallback to SQLite
* **Deployment**: Vercel (Frontend), Railway/Render (Backend)

---

## Project Structure

```
Linkedln ai agent/
├── backend/                      # FastAPI Web Application
│   ├── app/
│   │   ├── main.py               # FastAPI entrypoint
│   │   ├── core/                 # Config & Security
│   │   ├── services/             # Gemini 2.5 AI, News, Research services
│   │   └── api/v1/endpoints/     # REST Endpoints
│   └── requirements.txt
├── frontend/                     # Next.js Dashboard Application
│   ├── src/
│   │   ├── app/                  # Next.js App Router pages
│   │   ├── components/           # Sidebar, Header, ArticleModal
│   │   └── lib/                  # API client & types
│   └── package.json
├── database/
│   ├── schema.sql                # PostgreSQL / Supabase Schema
│   └── database.py               # Preserved SQLite database client
├── agents/                       # Preserved AI Agent pipeline modules
├── app.py                        # Preserved CLI workflow runner
├── DEPLOYMENT.md                 # Production deployment guide
└── API.md                        # REST API reference
```

---

## Quickstart Guide

### 1. Environment Setup

Copy `.env.example` to `.env` and fill in your keys:

```env
GEMINI_API_KEY=your_gemini_api_key_here
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
DATABASE_URL=sqlite:///./history/history.db
JWT_SECRET=super-secret-jwt-key
```

### 2. Running Locally

#### Backend:
```bash
python -m venv venv
# Windows: venv\Scripts\activate | Linux/macOS: source venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.app.main:app --reload --port 8000
```
- **FastAPI Backend Docs**: `http://localhost:8000/docs`

#### Frontend:
```bash
cd frontend
npm install
npm run dev
```
- **Frontend Dashboard**: `http://localhost:3000`

### 3. Running the Legacy Autonomous Agent CLI

```bash
python app.py
```

---

## Documentation

* Refer to [DEPLOYMENT.md](file:///c:/Users/saran/Desktop/Linkedln%20ai%20agent/DEPLOYMENT.md) for Vercel, Railway, and Supabase deployment steps.
* Refer to [API.md](file:///c:/Users/saran/Desktop/Linkedln%20ai%20agent/API.md) for REST API endpoint details.
