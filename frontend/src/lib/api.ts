import { Article, ResearchPaper, AIExplanation, GeneratedPost, UserProfile } from './types';
import { MOCK_ARTICLES, MOCK_PAPERS, MOCK_POSTS, INITIAL_PROFILE } from './mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function fetchPersonalizedFeed(domain?: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/feed/?domain=${domain || ''}`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Backend API unavailable, using mock feed data.");
  }
  return {
    personalized_domain: domain || "All Selected Domains",
    total_items: MOCK_ARTICLES.length + MOCK_PAPERS.length,
    latest_news: MOCK_ARTICLES,
    research_papers: MOCK_PAPERS,
    trending_topics: [
      { name: "Autonomous Agent Swarms", growth: "+184%", category: "AI Architecture" },
      { name: "Gemini 2.5 Flash API", growth: "+142%", category: "LLM Infrastructure" },
      { name: "Edge Quantized RAG", growth: "+96%", category: "Data Science" },
      { name: "Zero-Shot Code Verification", growth: "+88%", category: "Software Engineering" }
    ],
    recommended_courses: [
      { title: "Production AI Agents Masterclass", provider: "DeepLearning.AI", duration: "4 hours", level: "Advanced" },
      { title: "FastAPI & Supabase High Scale Architecture", provider: "Coursera", duration: "6 hours", level: "Intermediate" }
    ]
  };
}

export async function fetchNews(category?: string): Promise<Article[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/news/?category=${category || ''}`);
    if (res.ok) {
      const data = await res.json();
      return data.articles;
    }
  } catch (e) {
    console.warn("Backend API unavailable, using mock news.");
  }
  return MOCK_ARTICLES;
}

export async function fetchPapers(query: string = "cs.AI"): Promise<ResearchPaper[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/papers/?query=${encodeURIComponent(query)}`);
    if (res.ok) {
      const data = await res.json();
      return data.papers;
    }
  } catch (e) {
    console.warn("Backend API unavailable, using mock research papers.");
  }
  return MOCK_PAPERS;
}

export async function explainArticleOrPaper(title: string, content: string, source: string = ""): Promise<AIExplanation> {
  try {
    const res = await fetch(`${API_BASE_URL}/news/explain`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, source })
    });
    if (res.ok) {
      const data = await res.json();
      return data.explanation;
    }
  } catch (e) {
    console.warn("Backend API unavailable, using mock explanation.");
  }

  return {
    summary: `${title} delivers critical progress in scalable software engineering and artificial intelligence.`,
    key_takeaways: [
      "Accelerates developer throughput while ensuring clean system architecture.",
      "Integrates with modern cloud-native frameworks and continuous deployment pipelines.",
      "Reduces compute latency and optimizes operational costs for high-scale applications."
    ],
    beginner_explanation: `Think of ${title.slice(0, 30)} as a high-speed express train for processing data without bottlenecking traffic.`,
    intermediate_explanation: `${title} uses asynchronous handlers, type-safe API boundaries, and vector representations to deliver high performance.`,
    expert_explanation: `Implementation utilizes low-overhead state machines, non-blocking asynchronous event loops, and optimized memory allocations.`,
    real_world_applications: ["Automated AI agent swarms", "Real-time content synthesis", "Enterprise knowledge discovery"],
    related_technologies: ["Google Gemini 2.5 Flash", "FastAPI", "Next.js 14", "Supabase"],
    recommended_next_topics: ["Distributed Agent Systems", "Vector Index Tuning", "Edge RAG Optimization"],
    suggested_learning_roadmap: [
      "1. Fundamentals: Master REST API Contracts & State Management",
      "2. Intermediate: Configure Gemini LLM Pipelines & Function Calling",
      "3. Advanced: Scale Distributed Microservices with Supabase & Docker"
    ],
    estimated_reading_time_minutes: 5,
    difficulty_level: "Intermediate"
  };
}

export async function generateSocialPost(topic: string, description: string, platform: string, writing_style: string): Promise<GeneratedPost> {
  try {
    const res = await fetch(`${API_BASE_URL}/generator/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, description, platform, writing_style })
    });
    if (res.ok) {
      const data = await res.json();
      const p = data.generated_post;
      return {
        id: `post-${Date.now()}`,
        topic,
        platform: p.platform,
        writing_style: p.writing_style,
        headline: p.headline,
        content: p.content,
        hashtags: p.hashtags,
        status: "draft",
        created_at: new Date().toISOString()
      };
    }
  } catch (e) {
    console.warn("Backend API unavailable, using mock generator response.");
  }

  const sample_body = `Most teams get distracted by hype when looking at ${topic}.

Here is what actually matters if you're building software in production:

1️⃣ The Underlying Architecture
${description ? description.slice(0, 140) : 'Keeping system dependencies decoupled and state predictable saves months of debugging later.'}

2️⃣ Real-World Tradeoffs
Faster deployment cycles are great, but non-blocking error handling and zero-hallucination verification are what protect user trust.

3️⃣ What to Do Next
Start small. Benchmark your current pipeline bottlenecks before adding another layer of tools.

How is your engineering team approaching this right now? I'd love to hear your experiences in the comments.

#SoftwareEngineering #TechArchitecture #AI #DeveloperCommunity`;

  return {
    id: `post-${Date.now()}`,
    topic,
    platform: platform as any,
    writing_style,
    headline: `Real-world insights on ${topic}`,
    content: sample_body,
    hashtags: ["#SoftwareEngineering", "#TechArchitecture", "#AI", "#DeveloperCommunity"],
    status: "draft",
    created_at: new Date().toISOString()
  };
}

export async function searchAIResearch(query: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/research/search?q=${encodeURIComponent(query)}`);
    if (res.ok) {
      const data = await res.json();
      return data.dossier;
    }
  } catch (e) {
    console.warn("Backend API unavailable, using mock research dossier.");
  }

  return {
    query,
    ai_synthesis: `Research into ${query} represents one of the fastest-growing domains in modern technology. In 2026, systems are evolving from static scripts into fully autonomous, self-verifying agentic platforms. Key innovations focus on sub-second latency, zero-shot verification, and modular microservices.`,
    key_trends: [
      "Asynchronous multi-agent message orchestration",
      "Sub-100ms inference with Gemini 2.5 Flash engines",
      "Formal static analysis verification for zero hallucination"
    ],
    recommended_repositories: [
      { name: `awesome-${query.toLowerCase().replace(/\s+/g, '-')}`, description: "Curated list of frameworks, tools, and enterprise benchmarks.", stars: "15.2k", url: `https://github.com/search?q=${query}` },
      { name: `fast-${query.toLowerCase().replace(/\s+/g, '-')}-toolkit`, description: "High-throughput production toolkit with FastAPI wrappers.", stars: "8.7k", url: `https://github.com/search?q=${query}+toolkit` }
    ],
    key_research_papers: [
      { title: `Next-Generation Architectures for ${query}`, authors: "J. Doe, S. Chen et al.", year: 2026, citation_count: 320 },
      { title: `Empirical Benchmark Evaluation of ${query} in Enterprise Pipelines`, authors: "M. Taylor et al.", year: 2025, citation_count: 180 }
    ],
    learning_resources: [
      { title: `${query} Developer Documentation & Blueprint`, type: "Documentation", url: "https://docs.example.org" },
      { title: `State of ${query} Keynote 2026`, type: "Conference Talk", url: "https://youtube.com" }
    ]
  };
}
