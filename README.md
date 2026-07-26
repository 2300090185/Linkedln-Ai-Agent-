# NexusAI - AI Content Intelligence & Real-World Learning Platform

NexusAI is a full-stack platform built to automate tech news ingestion, generate ready-to-publish LinkedIn posts, track arXiv research papers, and provide interactive skill certifications with real-world project roadmaps.

Powered by Google's Gemini 2.5 Flash Engine and Next.js 14, NexusAI continuously pulls live stories from Hacker News and arXiv, synchronizing updates across all pages every 2 hours.

---

## What NexusAI Does

### Live Real-World News & Research Ingestion
NexusAI connects directly to public APIs (Hacker News and arXiv export APIs) to pull breaking news across AI, DevOps, Cloud Computing, Cybersecurity, and Web Development. Each story is paired with relevant academic preprints, citation metrics, and direct PDF downloads.

### Automatic LinkedIn Post Generation
The platform reads the top live story from the internet every cycle and drafts a structured, fact-checked LinkedIn post. You can also generate posts on any custom topic instantly.

### Interactive Quizzes & Verified Skill Certificates
Every 2 hours, NexusAI generates a 5-question quiz based on the latest news items. Answering questions earns XP points, unlocks developer badges, and lets you generate a verified PDF certificate complete with an embedded QR verification code.

### AI Implementation Roadmaps & Certification Course Links
Each roadmap module breaks down live tech releases into step-by-step engineering implementation steps. Every module includes direct links to official certification courses on DeepLearning.AI, Google Cloud, AWS, NVIDIA DLI, and Microsoft Learn.

### Fast, Zero-Latency Navigation
With global in-memory state caching and Next.js link prefetching, switching between pages happens instantly with smooth glassmorphic UI styling.

---

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS, Lucide Icons
- **Backend API**: FastAPI, Python 3.12, Supabase (pgvector)
- **AI Model**: Google Gemini 2.5 Flash Engine
- **Data Ingestion**: Hacker News API, arXiv Export API

---

## Quick Start

### Prerequisites
Make sure you have Node.js 18+ and npm installed on your system.

### Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/2300090185/Linkedln-Ai-Agent-.git
   cd Linkedln-Ai-Agent-
   ```

2. **Install dependencies and start the app**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Open the platform**:
   Visit `http://localhost:3000` in your web browser.

---

## Production Build

To test the production build locally:

```bash
cd frontend
npm run build
```

This compiles all 19 static and dynamic routes with zero build errors.

---

## Deployment

The application is configured for 1-click deployment on Vercel:
1. Connect your repository to Vercel.
2. Set the root directory to `frontend`.
3. Click Deploy.

---

## License

This project is open-source under the MIT License.
