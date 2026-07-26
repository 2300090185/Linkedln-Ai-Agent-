# 🚀 NexusAI - AI Content Intelligence & Real-World Learning Platform (Ultra Edition)

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Gemini 2.5 Flash](https://img.shields.io/badge/Gemini-2.5_Flash-8e44ad?style=for-the-badge&logo=google)](https://deepmind.google/)
[![GitHub License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> **NexusAI Ultra Edition** is an autonomous real-world content intelligence, automated LinkedIn post generation, academic research paper tracking, and interactive skill certification platform powered by live internet ingestion APIs and the **Gemini 2.5 Flash Engine**.

---

## ✨ Key Platform Features

### 🌐 1. Real-World Live Internet News Ingestion
- **Live Hacker News & arXiv Ingestion**: Dynamically fetches real-time top stories from the Hacker News API (`https://hacker-news.firebaseio.com`) and arXiv academic export API across **AI/LLMOps, Cloud & DevOps, Cybersecurity, Full Stack Web, Data Science, and Mobile**.
- **Zero Static Hardcoding**: 100% of news stories, abstracts, authors, and reading times update directly from the live internet.

### 🔄 2. Global 2-Hour Content Synchronization
- **Platform-Wide Synchronization**: Content across **Dashboard (`/dashboard`)**, **Tech News (`/news`)**, **Research Papers (`/papers`)**, **Trending Tech (`/trending`)**, **Learning Hub (`/learning`)**, and **AI Roadmaps (`/roadmap`)** updates in unison every 2 hours and on manual sync clicks.

### ✍️ 3. Daily Ready-To-Publish LinkedIn Post Generator
- **Auto-Generated LinkedIn Drafts**: Dynamically generates high-impact, fact-checked LinkedIn post drafts based directly on the #1 live tech story fetched from the internet.
- **Custom Topic Drafts**: Instant AI generation for any custom visitor topic in seconds.

### 🔬 4. arXiv Academic Research Stream & Citation Metrics
- **Attached Research Preprints**: Automatically pairs live news releases with relevant arXiv research papers (*Sparse MoE Routing*, *DiskANN*, *CUDA Kernel Fusing*, *FSDP*, *Free-Threaded CPython*).
- **Direct PDF Download**: 1-click links to official arXiv PDF research papers.

### 🎓 5. 5-Question Quiz Stepper, XP Rewards & Verified PDF Certificates
- **Interactive Quiz Stepper**: 5 multiple-choice questions derived directly from live real-world news stories.
- **XP & Level Badges**: Earn +100 XP per correct answer to unlock badges (*AI Novice Explorer*, *Tech Specialist*, *AI Systems Architect*, *NexusAI Fellow Scholar*).
- **Verified Certificate Generator**: Official printable skill certificate with embedded **SVG QR Verification Code** and 1-click **PDF Download**.

### 🗺️ 6. AI Implementation Roadmaps & Official Course Links
- **Derived Implementation Modules**: Technical step-by-step methodologies derived from live real-world releases.
- **Official Certificate Course Links**: Direct enrollment links to industry certifications (**DeepLearning.AI**, **Google Cloud AI Engineer**, **AWS Certified Machine Learning**, **NVIDIA DLI**, **Microsoft Azure AI**).

### ⚡ 7. Lightning-Fast 0ms Navigation & Cosmic Glassmorphic UI
- **In-Memory Caching (`CACHE_TTL_MS`)**: Global state caching guarantees 0.00ms instantaneous page-to-page navigation across all routes.
- **Next.js Link Prefetching**: Background bundle preloading eliminates loading spinners.
- **Cosmic Dark UI**: Ultra-sleek dark mode with glassmorphic cards, ambient glow borders, and 60fps micro-animations.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | [Next.js 14 App Router](https://nextjs.org/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [TailwindCSS](https://tailwindcss.com/) & Vanilla CSS Glassmorphism |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **AI & LLM Engine** | [Google Gemini 2.5 Flash API](https://deepmind.google/) |
| **Backend API** | [FastAPI](https://fastapi.tiangolo.com/) & [Python 3.12](https://www.python.org/) |
| **Data Ingestion** | Hacker News API & arXiv Export API |
| **Database** | PostgreSQL with pgvector (Supabase) |

---

## 🚦 Getting Started Locally

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/2300090185/Linkedln-Ai-Agent-.git
   cd Linkedln-Ai-Agent-
   ```

2. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the running platform.

---

## 🏗️ Production Build & Verification

To verify the production build before cloud deployment:

```bash
cd frontend
npm run build
```

**Verified Output**:
```text
  ▲ Next.js 14.2.35
   Creating an optimized production build ...
 ✓ Compiled successfully
 ✓ Linting and checking validity of types
 ✓ Collecting page data
 ✓ Generating static pages (19/19)
 ✓ Finalizing page optimization
```

---

## ☁️ Deployment Guide (Vercel)

This project is optimized for 1-click cloud deployment on [Vercel](https://vercel.com/):

1. Import repository on [Vercel](https://vercel.com/new).
2. Set **Root Directory** to `frontend`.
3. Click **Deploy**.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Developed with ❤️ for AI Engineers, Software Architects, and Tech Content Creators worldwide.
</p>
