# Production Deployment Guide: AI Content Intelligence Platform

This guide outlines step-by-step instructions to deploy the full-stack platform to production.

---

## Architecture Overview

* **Frontend**: Next.js (App Router) deployed on **Vercel**
* **Backend**: FastAPI (Python 3.12) deployed on **Railway** or **Render**
* **Database**: PostgreSQL on **Supabase**
* **AI Engine**: Google Gemini 2.5 Flash (`google-genai` SDK)

---

## 1. Database Setup (Supabase)

1. Sign in to [Supabase](https://supabase.com) and create a new project.
2. Go to the **SQL Editor** tab.
3. Paste the contents of `database/schema.sql` and run the script to initialize all normalized tables and seed default interest domains.
4. Copy your **Database Connection String** (`DATABASE_URL`), **Supabase URL**, and **Anon Key** from Project Settings -> API.

---

## 2. Backend Deployment (Railway / Render)

### Option A: Railway

1. Log into [Railway.app](https://railway.app).
2. Click **New Project** -> **Deploy from GitHub repo**.
3. Select your repository.
4. Set Build Command to `pip install -r backend/requirements.txt` and Start Command to `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`.
5. Add Environment Variables in Railway:
   * `GEMINI_API_KEY`: Your Gemini API key from Google AI Studio.
   * `DATABASE_URL`: Your Supabase connection string.
   * `JWT_SECRET`: A secure random secret string.
6. Deploy. Railway will provide a public URL (e.g. `https://your-backend.up.railway.app`).

### Option B: Render

1. Create a **New Web Service** on [Render](https://render.com).
2. Connect your GitHub repository.
3. Environment: `Python 3`. Build Command: `pip install -r backend/requirements.txt`, Start Command: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`.
4. Add the same Environment Variables.

---

## 3. Frontend Deployment (Vercel)

1. Log into [Vercel](https://vercel.com).
2. Click **Add New** -> **Project** and select your repository.
3. Set Root Directory to `frontend`.
4. Framework Preset: **Next.js**.
5. Add Environment Variable:
   * `NEXT_PUBLIC_API_URL`: `https://your-backend.up.railway.app/api/v1`
6. Click **Deploy**. Vercel will build and host your production dashboard.

