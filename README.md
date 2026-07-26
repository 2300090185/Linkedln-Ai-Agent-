# NexusAI - Autonomous Tech Content & Learning Agent

NexusAI is a full-stack web application designed to track real-world technology news, generate ready-to-publish LinkedIn posts, aggregate arXiv research papers, and provide interactive developer quizzes and learning roadmaps.

I built this project to solve a real problem: keeping up with fast-moving tech releases while maintaining a consistent technical personal brand on LinkedIn without spending hours every day scouring different news sites.

---

## What it does

- Live News Ingestion: Fetches real-world top stories from Hacker News and arXiv export APIs in real time across AI, Cloud Computing, DevOps, Web Development, and Cybersecurity.
- Ready-to-Publish Posts: Takes the top trending story from each ingestion cycle and generates a structured LinkedIn post draft tailored for software engineers.
- arXiv Research Papers: Pairs news stories with relevant academic research preprints, author credits, citation metrics, and direct PDF downloads.
- Interactive Quizzes & Badges: Generates 5 multiple-choice questions per cycle based on live news, awarding XP points, developer badges, and a downloadable PDF certificate with a verification QR code.
- Project Implementation Roadmaps: Converts live news releases into step-by-step technical roadmaps with direct links to official certificate courses from Google Cloud, AWS, DeepLearning.AI, NVIDIA, and Microsoft.
- Fast Page Navigation: Uses Next.js App Router link prefetching and in-memory global caching for instant 0ms page-to-page navigation.

---

## Project Structure

- frontend/: Next.js 14 application built with TypeScript, TailwindCSS, and Lucide Icons.
- backend/: FastAPI Python backend powering RAG context retrieval and Gemini 2.5 Flash API calls.
- agents/: Orchestration and multi-agent pipeline scripts.

---

## How to run it locally

First, clone the repository to your local machine:

git clone https://github.com/2300090185/Linkedln-Ai-Agent-.git
cd Linkedln-Ai-Agent-

Next, move into the frontend directory and install the dependencies:

cd frontend
npm install

Start the Next.js development server:

npm run dev

Open your browser and navigate to http://localhost:3000 to interact with the dashboard.

---

## Production Build

To verify that the application compiles cleanly for production:

cd frontend
npm run build

All 19 application routes compile statically with zero errors.

---

## Deploying to Render

1. Push your code to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) and create a new **Blueprint**.
3. Connect your repository. Render will automatically detect `render.yaml` and configure the service.
4. Set the environment variables (`GEMINI_API_KEY`, `DATABASE_URL`, `NEXT_PUBLIC_API_URL`, etc.).
5. Click **Apply**.

For complete step-by-step instructions, see [DEPLOYMENT.md](file:///c:/Users/saran/Desktop/Linkedln%20ai%20agent/DEPLOYMENT.md).

---

## License

This project is open-source under the MIT License.
