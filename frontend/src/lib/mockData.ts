import { Article, ResearchPaper, GeneratedPost, UserProfile, DailyQuiz, HashtagTrend, PostScheduleItem } from './types';

export const INITIAL_PROFILE: UserProfile = {
  id: "usr-001",
  email: "sarannc@platform.ai",
  full_name: "Saran Krishna",
  role: "admin",
  avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
  target_audience: "Tech Leaders, AI Engineers & Founders",
  domains: [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Cybersecurity",
    "Cloud Computing",
    "AWS",
    "DevOps",
    "Kubernetes",
    "Docker",
    "Python",
    "React",
    "Software Engineering"
  ]
};

export const MOCK_PAPERS: ResearchPaper[] = [
  {
    id: "paper-201",
    title: "Scalable Multi-Agent Reasoning via Asynchronous Message Handoffs",
    abstract: "We present a mathematical framework and empirical validation for scaling autonomous multi-agent systems to 1,000+ concurrent LLM instances without bottlenecking context windows.",
    authors: ["Dr. Sarah Jenkins", "Alex Rivera", "Kenji Sato"],
    publisher: "arXiv cs.AI",
    url: "https://arxiv.org/abs/2607.01234",
    pdf_url: "https://arxiv.org/pdf/2607.01234.pdf",
    published_date: "2026-07-25T00:00:00Z",
    citation_count: 142,
    doi: "10.48550/arXiv.2607.01234"
  },
  {
    id: "paper-202",
    title: "Optimizing Vector Index Quantization for Edge RAG Applications",
    abstract: "High density vector compression techniques enabling sub-10ms similarity search queries on resource constrained client devices.",
    authors: ["Prof. Michael Zhang", "Elena Rostova"],
    publisher: "IEEE Xplore",
    url: "https://ieeexplore.ieee.org/document/260705678",
    pdf_url: "https://arxiv.org/pdf/2607.05678.pdf",
    published_date: "2026-07-24T00:00:00Z",
    citation_count: 98,
    doi: "10.1109/TNNLS.2026.334455"
  },
  {
    id: "paper-203",
    title: "Zero-Shot Formal Verification of LLM Generated Code Pipelines",
    abstract: "A novel static analysis pass combining AST transformation with formal theorem provers to eliminate hallucinated API calls prior to runtime execution.",
    authors: ["Dr. Liam O'Connor", "Sophia Patel", "Hao Wei"],
    publisher: "ACM Digital Library",
    url: "https://dl.acm.org/doi/10.1145/260709012",
    pdf_url: "https://arxiv.org/pdf/2607.09012.pdf",
    published_date: "2026-07-23T00:00:00Z",
    citation_count: 310,
    doi: "10.1145/3612345.3612399"
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: "art-101",
    title: "OpenAI Engineering Blog: Autonomous Agent Swarm Architecture v2",
    description: "A landmark release enabling autonomous swarm communication, dynamic state handoffs, and real-time execution safety limits in production pipelines.",
    url: "https://openai.com/index/engineering/",
    source_name: "OpenAI Engineering",
    source_category: "Tech Company",
    published_date: "2026-07-26T10:00:00Z",
    reading_time_minutes: 6,
    difficulty_level: "Expert",
    tags: ["OpenAI", "AI Agents", "Architecture"],
    related_paper: MOCK_PAPERS[0]
  },
  {
    id: "art-lkd-101",
    title: "LinkedIn Post by Andrej Karpathy: Software 2.0 vs Agentic Tool Calling",
    description: "Viral LinkedIn Post: 'Stop overloading single LLM prompts. In production, decoupled micro-agents with clear tool schemas win every time. Here is our 3-step breakdown...'",
    url: "https://www.linkedin.com/in/andrej-karpathy/",
    source_name: "Andrej Karpathy (LinkedIn)",
    source_category: "LinkedIn Creator",
    published_date: "2026-07-26T09:30:00Z",
    reading_time_minutes: 3,
    difficulty_level: "Intermediate",
    tags: ["LinkedIn Creator", "AI Architecture", "Karpathy"],
    related_paper: MOCK_PAPERS[0]
  },
  {
    id: "art-102",
    title: "Google AI Research: Gemini 2.5 Flash Benchmarks & Production Setup",
    description: "Gemini 2.5 Flash achieves unprecedented 45% latency reduction across multi-modal reasoning and live code verification benchmarks.",
    url: "https://blog.google/technology/ai/",
    source_name: "Google DeepMind",
    source_category: "Tech Company",
    published_date: "2026-07-26T08:30:00Z",
    reading_time_minutes: 4,
    difficulty_level: "Intermediate",
    tags: ["Google AI", "Gemini", "LLM Infrastructure"],
    related_paper: MOCK_PAPERS[2]
  },
  {
    id: "art-lkd-102",
    title: "LinkedIn Post by Yann LeCun: World Models vs Direct Token Prediction",
    description: "Viral LinkedIn Discussion: 'Autoregressive token prediction alone is not enough for true spatial reasoning. Why enterprise developers need JEPA architectures...'",
    url: "https://www.linkedin.com/in/yann-lecun/",
    source_name: "Yann LeCun (LinkedIn)",
    source_category: "LinkedIn Creator",
    published_date: "2026-07-26T07:15:00Z",
    reading_time_minutes: 4,
    difficulty_level: "Expert",
    tags: ["LinkedIn Creator", "World Models", "Meta AI"],
    related_paper: MOCK_PAPERS[1]
  },
  {
    id: "art-103",
    title: "NVIDIA Blackwell B200 Datacenter Scaling Architecture Guide",
    description: "Complete hardware specification and software stack details for configuring multi-node Blackwell supercomputing clusters for real-time inference.",
    url: "https://blogs.nvidia.com/",
    source_name: "NVIDIA Developer",
    source_category: "Tech Company",
    published_date: "2026-07-25T16:00:00Z",
    reading_time_minutes: 8,
    difficulty_level: "Expert",
    tags: ["NVIDIA", "Hardware", "Cloud"],
    related_paper: MOCK_PAPERS[1]
  },
  {
    id: "art-lkd-103",
    title: "LinkedIn Post by Martin Fowler: Micro-Frontends & LLM Tool Integrations",
    description: "Trending LinkedIn Insight: 'Decoupling AI generation from UI component state prevents catastrophic UI crashes when schemas mutate.'",
    url: "https://www.linkedin.com/in/martin-fowler/",
    source_name: "Martin Fowler (LinkedIn)",
    source_category: "LinkedIn Creator",
    published_date: "2026-07-25T12:00:00Z",
    reading_time_minutes: 5,
    difficulty_level: "Intermediate",
    tags: ["LinkedIn Creator", "Software Architecture", "DevOps"],
    related_paper: MOCK_PAPERS[2]
  },
  {
    id: "art-104",
    title: "TechCrunch AI: How Enterprise Engineering Teams Deploy AI Code Checkers",
    description: "An analysis of Fortune 500 engineering workflows introducing automated AI static checkers before merge requests.",
    url: "https://techcrunch.com/category/artificial-intelligence/",
    source_name: "TechCrunch AI",
    source_category: "Tech Website",
    published_date: "2026-07-25T14:00:00Z",
    reading_time_minutes: 5,
    difficulty_level: "Beginner",
    tags: ["TechCrunch", "DevOps", "Software Engineering"],
    related_paper: MOCK_PAPERS[2]
  },
  {
    id: "art-105",
    title: "MIT Tech Review: Zero-Trust Security Boundaries in LLM Context Stores",
    description: "Protecting model weights, prompt context, and memory stores against side-channel extraction and prompt injection vectors.",
    url: "https://www.technologyreview.com/",
    source_name: "MIT Tech Review",
    source_category: "Tech Website",
    published_date: "2026-07-24T11:00:00Z",
    reading_time_minutes: 7,
    difficulty_level: "Intermediate",
    tags: ["Cybersecurity", "Zero Trust", "AI Security"],
    related_paper: MOCK_PAPERS[2]
  }
];

export const MOCK_POSTS: GeneratedPost[] = [
  {
    id: "post-301",
    topic: "Gemini 2.5 Flash Latency Reduction",
    platform: "LinkedIn",
    writing_style: "Educational",
    headline: "🚀 How Gemini 2.5 Flash Slashes Inference Latency by 45%",
    content: `Most engineering teams discuss LLM intelligence, but in production, latency is king.

Here is how we benchmarked Gemini 2.5 Flash in our multi-agent pipeline:

1️⃣ 45% Faster Inference: Token generation rates consistently hit 140 tokens/sec.
2️⃣ Structured JSON Accuracy: Clean Pydantic schema validation without costly retry loops.
3️⃣ Compute Budget Efficiency: Sub-second response times keep user experience instantaneous while cutting infrastructure costs.

Shiny demos look cool on Twitter, but sub-second execution is what scales enterprise software.

Are you integrating Gemini 2.5 Flash into your production stack yet? Let's compare notes below! 👇

#SoftwareEngineering #SystemArchitecture #AI #Gemini #DeveloperCommunity`,
    hashtags: ["#SoftwareEngineering", "#SystemArchitecture", "#AI", "#Gemini", "#DeveloperCommunity"],
    status: "published",
    created_at: "2026-07-26T09:15:00Z"
  },
  {
    id: "post-302",
    topic: "Autonomous Agent Swarms",
    platform: "Twitter/X",
    writing_style: "Technical",
    headline: "🧵 1/5 Scaling Multi-Agent Systems to 1,000+ Swarms",
    content: `1/5 How do you scale multi-agent LLM systems without running out of context window memory? Let's break down asynchronous message passing in this thread 🧵👇

2/5 Instead of keeping all agent dialogues in a monolithic prompt, use decoupled state dispatchers.

3/5 Each sub-agent communicates via structured events, returning only finalized JSON schemas.

4/5 Result: 90% reduction in token overhead and zero memory leakage.

5/5 Read full paper: https://arxiv.org/abs/2607.01234`,
    hashtags: ["#AI", "#TechThread", "#Agents"],
    status: "scheduled",
    created_at: "2026-07-26T11:00:00Z"
  },
  {
    id: "post-303",
    topic: "FastAPI & Supabase Architecture",
    platform: "LinkedIn",
    writing_style: "Thought Leadership",
    headline: "💡 Why Asynchronous Python Backends Dominate AI Workloads",
    content: `Synchronous REST endpoints are a bottleneck when your API calls out to LLM providers.

Switching our FastAPI stack to non-blocking async handlers and Supabase pgvector embedding search boosted concurrent throughput by 4x.

Key takeaway: Don't block the main event loop when waiting for asynchronous inference streams.

What is your preferred backend stack for LLM agents in 2026?

#FastAPI #Python #Supabase #BackendEngineering #CloudArchitecture`,
    hashtags: ["#FastAPI", "#Python", "#Supabase", "#BackendEngineering"],
    status: "draft",
    created_at: "2026-07-26T12:00:00Z"
  }
];

export const DAILY_QUIZ_DATA: DailyQuiz = {
  id: "quiz-2026-07-26",
  date: "July 26, 2026",
  concept_title: "Agentic Function Handoffs & Decoupled State Machines",
  question: "In production multi-agent architectures, why is passing full chat conversation histories between specialized micro-agents considered an anti-pattern?",
  options: [
    "It causes exponential context degradation, higher token costs, and increased hallucination risks.",
    "It slows down network transfer speeds by exceeding standard HTTP payload headers.",
    "JSON serializers cannot process nested arrays in Python asynchronous runtime loops.",
    "LLM API endpoints only accept single-string prompts without role parameters."
  ],
  correct_index: 0,
  explanation: "Monolithic context accumulation degrades model attention accuracy and bloats token consumption. Passing structured JSON outputs between decoupled state machines keeps agent context narrow, accurate, and cost-effective.",
  xp_reward: 150
};

export const HASHTAG_TRENDS: HashtagTrend[] = [
  { tag: "#AgenticAI", posts_count: "48.2k posts today", growth: "+195%", avg_engagement: "4.8%", category: "AI Architecture" },
  { tag: "#Gemini25", posts_count: "32.1k posts today", growth: "+160%", avg_engagement: "5.2%", category: "LLM Models" },
  { tag: "#SystemArchitecture", posts_count: "28.5k posts today", growth: "+88%", avg_engagement: "3.9%", category: "Software Engineering" },
  { tag: "#LLMOps", posts_count: "22.9k posts today", growth: "+142%", avg_engagement: "4.5%", category: "DevOps & Infrastructure" },
  { tag: "#FullStackAI", posts_count: "19.4k posts today", growth: "+110%", avg_engagement: "4.1%", category: "Web Development" }
];

export const POST_SCHEDULE_ITEMS: PostScheduleItem[] = [
  {
    id: "sched-1",
    post: MOCK_POSTS[0],
    scheduled_time: "Today at 08:30 AM",
    target_slot: "Morning Peak (Tech Leaders & Executives)",
    is_published: true
  },
  {
    id: "sched-2",
    post: MOCK_POSTS[1],
    scheduled_time: "Today at 12:15 PM",
    target_slot: "Lunch Break (Developers & Engineers)",
    is_published: false
  },
  {
    id: "sched-3",
    post: MOCK_POSTS[2],
    scheduled_time: "Today at 05:45 PM",
    target_slot: "Evening Wind-Down (Global Audience)",
    is_published: false
  }
];
