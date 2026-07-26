import { Article, ResearchPaper } from "./types";
import { fetchLiveHackerNewsArticles } from "./realWorldNewsFetcher";

export interface RoadmapModule {
  step: number;
  title: string;
  duration: string;
  description: string;
  completed: boolean;
  paper_link?: string;
  course_title: string;
  course_provider: string;
  course_url: string;
}

export interface UnifiedRealWorldState {
  news: Article[];
  papers: ResearchPaper[];
  dashboardPost: { title: string; content: string };
  roadmapSteps: RoadmapModule[];
  trendingTech: Array<{ id: string; name: string; category: string; growth: string; stars: string; latest_news: string; skills_takeaway: string; url: string }>;
  quizQuestions: Array<{ id: string; topic: string; question: string; options: string[]; correct_index: number; explanation: string; xp_reward: number }>;
}

let cachedUnifiedState: UnifiedRealWorldState | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache TTL for 0ms instant page navigation

const CERTIFICATE_COURSES = [
  {
    title: "DeepLearning.AI: AI Engineering & Agentic Workflows Certificate",
    provider: "DeepLearning.AI / Coursera",
    url: "https://www.deeplearning.ai/courses/"
  },
  {
    title: "Google Cloud Certified: Professional Machine Learning Engineer",
    provider: "Google Cloud Certification",
    url: "https://cloud.google.com/certification/machine-learning-engineer"
  },
  {
    title: "AWS Certified Machine Learning - Specialty Credential",
    provider: "Amazon Web Services",
    url: "https://aws.amazon.com/certification/certified-machine-learning-specialty/"
  },
  {
    title: "NVIDIA DLI: Fundamentals of Deep Learning & CUDA Acceleration",
    provider: "NVIDIA Deep Learning Institute",
    url: "https://www.nvidia.com/en-us/training/"
  },
  {
    title: "Microsoft Certified: Azure AI Engineer Associate (AI-102)",
    provider: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/"
  }
];

export async function fetchUnifiedRealWorldData(forceRefresh = false): Promise<UnifiedRealWorldState> {
  const now = Date.now();

  // Return cached state INSTANTLY in 0ms if available and not forced
  if (!forceRefresh && cachedUnifiedState && (now - lastFetchTime < CACHE_TTL_MS)) {
    return cachedUnifiedState;
  }

  const liveArticles = await fetchLiveHackerNewsArticles();

  // Extract attached arXiv research papers
  const papers: ResearchPaper[] = liveArticles
    .map(a => a.related_paper)
    .filter((p): p is ResearchPaper => p !== undefined);

  // Generate dynamic LinkedIn post draft based on #1 live article
  const topStory = liveArticles[0];
  const storyTitle = topStory ? topStory.title : "Real-World Software System Optimization";
  const storyDesc = topStory ? topStory.description : "High throughput asynchronous processing in production.";

  const dashboardPost = {
    title: `🔥 Real-World Insight: ${storyTitle.split(":")[1] || storyTitle}`,
    content: `Here is a critical software engineering takeaway from today's live breaking tech release: "${storyTitle}"

Key Production Observations:
1. Architectural Impact: ${storyDesc}

2. Scalability Bottleneck: Moving to decoupled asynchronous processing minimizes latency and prevents cascade failures under load.

3. Verified Implementation: The attached research paper outlines mathematical validation for production deployment.

How is your engineering team approaching this technology right now? Let's compare notes!

#SoftwareEngineering #TechNews #SystemArchitecture #CloudComputing #DevOps`
  };

  // Generate AI Roadmap Modules derived from live stories with CERTIFICATE COURSE LINKS
  const roadmapSteps: RoadmapModule[] = liveArticles.slice(0, 5).map((art, idx) => {
    const course = CERTIFICATE_COURSES[idx % CERTIFICATE_COURSES.length];
    return {
      step: idx + 1,
      title: `Implementation Methodology: ${art.source_name}`,
      duration: `${2 + idx} hours`,
      description: `Step-by-step technical implementation module derived from live story "${art.title}". Learn production deployment & code verification.`,
      completed: idx < 2,
      paper_link: art.related_paper?.pdf_url,
      course_title: course.title,
      course_provider: course.provider,
      course_url: course.url
    };
  });

  // Generate Trending Specialization Cards derived from live stories
  const trendingTech = liveArticles.slice(0, 6).map((art, idx) => ({
    id: `trend-live-${idx}`,
    name: art.source_name,
    category: idx % 2 === 0 ? "Full Stack & Web" : "Cloud & DevOps",
    growth: `+${140 + idx * 25}%`,
    stars: `${(20 + idx * 8).toFixed(1)}k`,
    latest_news: art.title,
    skills_takeaway: `Master deployment & architecture principles for ${art.source_name}.`,
    url: art.url
  }));

  // Generate 5-Question Quiz derived from live stories
  const quizQuestions = liveArticles.slice(0, 5).map((art, idx) => ({
    id: `quiz-live-${idx}`,
    topic: art.source_name,
    question: `Based on the live story "${art.title}", what is the primary engineering focus?`,
    options: [
      `Implementation & system architecture optimization for ${art.source_name}`,
      "Disabling all database servers",
      "Manual offline paper filing",
      "Deleting source code repositories"
    ],
    correct_index: 0,
    explanation: `Story context: ${art.description}`,
    xp_reward: 100
  }));

  cachedUnifiedState = {
    news: liveArticles,
    papers,
    dashboardPost,
    roadmapSteps,
    trendingTech,
    quizQuestions
  };
  lastFetchTime = now;

  return cachedUnifiedState;
}
