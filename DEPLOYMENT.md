# Production Deployment Guide: AI Content Intelligence Platform

This guide outlines step-by-step instructions to deploy the full-stack platform to production using **Render**.

---

## Architecture Overview

* **Frontend**: Next.js (App Router) deployed on **Render**
* **Backend**: FastAPI (Python 3.12) deployed on **Render**
* **Database**: PostgreSQL on **Supabase** (or Render PostgreSQL)
* **AI Engine**: Google Gemini 2.5 Flash (`google-genai` SDK)

---

## 1. Database Setup (Supabase)

1. Sign in to [Supabase](https://supabase.com) and create a new project.
2. Go to the **SQL Editor** tab.
3. Paste the contents of `database/schema.sql` and run the script to initialize all normalized tables and seed default interest domains.
4. Copy your **Database Connection String** (`DATABASE_URL`), **Supabase URL**, and **Anon Key** from Project Settings -> API.

---

## 2. Platform Deployment (Render)

### Method 1: Infrastructure as Code (1-Click Blueprint - Recommended)
1. Push this repository to GitHub.
2. Log into [Render.com](https://render.com) and click **New +** -> **Blueprint**.
3. Connect your repository. Render will automatically detect `render.yaml` and configure both the **Backend** (FastAPI) and **Frontend** (Next.js) web services.
4. Fill in the required environment variables:
   - `GEMINI_API_KEY`: Your Gemini API key from Google AI Studio.
   - `DATABASE_URL`: Your database connection string.
   - `NEXT_PUBLIC_API_URL`: Your backend URL + `/api/v1` (e.g. `https://linkedin-ai-agent-backend.onrender.com/api/v1`).
5. Click **Apply**.

### Method 2: Manual Setup on Render
1. Log into [Render.com](https://render.com) and click **New +** -> **Web Service**.
2. **Backend Setup**:
   * Repository: Select your GitHub repo.
   * Environment: `Python 3`
   * Build Command: `pip install -r backend/requirements.txt`
   * Start Command: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`
   * Environment Variables: `GEMINI_API_KEY`, `DATABASE_URL`, `JWT_SECRET`, `SUPABASE_URL`, `SUPABASE_KEY`.
3. **Frontend Setup**:
   * Click **New +** -> **Web Service**.
   * Root Directory: `frontend`
   * Environment: `Node`
   * Build Command: `npm install && npm run build`
   * Start Command: `npm run start`
   * Environment Variable: `NEXT_PUBLIC_API_URL` (set to your Render Backend URL + `/api/v1`).

---

## 3. Alternative: Deploy Frontend on Vercel

If you prefer hosting the Next.js frontend on **Vercel** while keeping the FastAPI backend on **Render**:

1. Log into [Vercel](https://vercel.com) and click **Add New** -> **Project**.
2. Connect your GitHub repository.
3. Vercel will automatically detect `vercel.json` and configure the build settings (`frontend` directory).
4. Add the Environment Variable:
   - `NEXT_PUBLIC_API_URL`: `https://linkedin-ai-agent-backend.onrender.com/api/v1`
5. Click **Deploy**.

