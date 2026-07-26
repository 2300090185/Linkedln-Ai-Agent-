# REST API Reference: AI Content Intelligence Platform

Base URL: `/api/v1`

---

## Authentication & Onboarding

### `POST /auth/login`
Authenticate user and return JWT access token.
- **Request**: `{ "email": "user@platform.ai", "password": "..." }`
- **Response**: `{ "access_token": "...", "user": { ... } }`

### `POST /auth/onboarding`
Update onboarding interest domains.
- **Request**: `{ "domains": ["Artificial Intelligence", "Python", ...] }`

### `GET /auth/me`
Fetch current user profile and target audience configuration.

---

## Personalized Feed & News

### `GET /feed/`
Fetch personalized content stream filtered by domain interests.
- **Query Params**: `domain` (optional)
- **Returns**: Latest news, research papers, trending topics, and recommended courses.

### `GET /news/`
Fetch tech news from Tech Companies and Tech Websites.
- **Query Params**: `category` (`company` or `website`)

### `POST /news/explain`
Generate 3-tier difficulty explanations (Beginner, Intermediate, Expert) and learning roadmap for an article.
- **Request**: `{ "title": "...", "content": "...", "source": "..." }`

---

## Academic & Research Papers

### `GET /papers/`
Fetch papers from arXiv, Semantic Scholar, IEEE, ACM, DOAJ, and Crossref.
- **Query Params**: `query` (e.g. `cs.AI`), `limit`

### `POST /papers/explain`
Generate AI research paper breakdown.

---

## AI Social Post Generator

### `POST /generator/generate`
Generate customized multi-platform content using Gemini 2.5 Flash.
- **Request**:
```json
{
  "topic": "Gemini 2.5 Flash Production Deployment",
  "description": "Reduced inference latency by 45%",
  "platform": "LinkedIn",
  "writing_style": "Professional"
}
```
- **Supported Platforms**: `LinkedIn`, `Twitter/X`, `Blog`, `Newsletter`, `Instagram`
- **Supported Styles**: `Professional`, `Educational`, `Storytelling`, `Technical`, `Thought Leadership`, `Recruiter Friendly`, `Student Friendly`

### `GET /generator/history`
Fetch generated draft post history.

---

## AI Research Assistant

### `GET /research/search?q={query}`
Generate multi-source AI research dossier synthesizing news, papers, GitHub repos, conference talks, books, and documentation.

---

## Learning Hub & Analytics

### `GET /learning/hub`
Get active reading streak, weekly goal status, completed topics, and bookmarks.

### `POST /learning/bookmarks`
Save article or paper to personal library.

### `GET /analytics/`
Fetch activity heatmaps, category distributions, reading time metrics, and generated post statistics.

---

## Admin Panel

### `GET /admin/sources`
List configured RSS and academic feed sources.

### `GET /admin/prompts`
List customizable AI prompt templates.

### `GET /admin/logs`
View real-time system logs.
