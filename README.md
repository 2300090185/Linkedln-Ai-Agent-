# NexusAI - AI Content Intelligence and Real-World Learning Platform

NexusAI Ultra Edition is an autonomous real-world content intelligence, automated LinkedIn post generation, academic research paper tracking, and interactive skill certification platform powered by live internet ingestion APIs and the Gemini 2.5 Flash Engine.

---

## Key Platform Features

### 1. Real-World Live Internet News Ingestion
- Live Hacker News and arXiv Ingestion: Dynamically fetches real-time top stories from the Hacker News API (https://hacker-news.firebaseio.com) and arXiv academic export API across AI/LLMOps, Cloud and DevOps, Cybersecurity, Full Stack Web, Data Science, and Mobile.
- Zero Static Hardcoding: 100% of news stories, abstracts, authors, and reading times update directly from the live internet.

### 2. Global 2-Hour Content Synchronization
- Platform-Wide Synchronization: Content across Dashboard (/dashboard), Tech News (/news), Research Papers (/papers), Trending Tech (/trending), Learning Hub (/learning), and AI Roadmaps (/roadmap) updates in unison every 2 hours and on manual sync clicks.

### 3. Daily Ready-To-Publish LinkedIn Post Generator
- Auto-Generated LinkedIn Drafts: Dynamically generates high-impact, fact-checked LinkedIn post drafts based directly on the #1 live tech story fetched from the internet.
- Custom Topic Drafts: Instant AI generation for any custom visitor topic in seconds.

### 4. arXiv Academic Research Stream and Citation Metrics
- Attached Research Preprints: Automatically pairs live news releases with relevant arXiv research papers (Sparse MoE Routing, DiskANN, CUDA Kernel Fusing, FSDP, Free-Threaded CPython).
- Direct PDF Download: Direct links to official arXiv PDF research papers.

### 5. 5-Question Quiz Stepper, XP Rewards and Verified PDF Certificates
- Interactive Quiz Stepper: 5 multiple-choice questions derived directly from live real-world news stories.
- XP and Level Badges: Earn +100 XP per correct answer to unlock badges (AI Novice Explorer, Tech Specialist, AI Systems Architect, NexusAI Fellow Scholar).
- Verified Certificate Generator: Official printable skill certificate with embedded SVG QR Verification Code and 1-click PDF Download.

### 6. AI Implementation Roadmaps and Official Course Links
- Derived Implementation Modules: Technical step-by-step methodologies derived from live real-world releases.
- Official Certificate Course Links: Direct enrollment links to industry certifications (DeepLearning.AI, Google Cloud AI Engineer, AWS Certified Machine Learning, NVIDIA DLI, Microsoft Azure AI).

### 7. Fast Navigation and Cosmic Dark UI
- In-Memory Caching (CACHE_TTL_MS): Global state caching guarantees fast page-to-page navigation across all routes.
- Next.js Link Prefetching: Background bundle preloading eliminates loading spinners.
- Cosmic Dark UI: Dark mode with glassmorphic cards, ambient glow borders, and micro-animations.

---

## Technology Stack

- Frontend Framework: Next.js 14 App Router
- Language: TypeScript
- Styling: TailwindCSS and Vanilla CSS Glassmorphism
- Icons: Lucide React
- AI Engine: Google Gemini 2.5 Flash API
- Backend API: FastAPI and Python 3.12
- Data Ingestion: Hacker News API and arXiv Export API
- Database: PostgreSQL with pgvector (Supabase)

---

## Getting Started Locally

### Prerequisites
- Node.js v18.0.0 or higher
- npm v9.0.0 or higher

### Installation Steps

1. Clone the Repository:
   ```bash
   git clone https://github.com/2300090185/Linkedln-Ai-Agent-.git
   cd Linkedln-Ai-Agent-
   ```

2. Install Frontend Dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Run the Development Server:
   ```bash
   npm run dev
   ```

4. Open in Browser:
   Navigate to http://localhost:3000 to view the running platform.

---

## Production Build and Verification

To verify the production build before cloud deployment:

```bash
cd frontend
npm run build
```

Verified Output:
```text
  Next.js 14.2.35
   Creating an optimized production build ...
   Compiled successfully
   Linting and checking validity of types
   Collecting page data
   Generating static pages (19/19)
   Finalizing page optimization
```

---

## Deployment Guide (Vercel)

This project is optimized for 1-click cloud deployment on Vercel:

1. Import repository on Vercel (https://vercel.com/new).
2. Set Root Directory to frontend.
3. Click Deploy.

---

## License

Distributed under the MIT License. See LICENSE for more information.
