"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Sparkles,
  Flame,
  BookOpen,
  FileText,
  TrendingUp,
  ArrowUpRight,
  ChevronRight,
  Clock,
  Cpu,
  Copy,
  Check,
  Zap,
  Send,
  RefreshCw,
  Globe
} from "lucide-react";
import { Article, ResearchPaper, AIExplanation } from "@/lib/types";
import { explainArticleOrPaper, generateSocialPost } from "@/lib/api";
import { fetchUnifiedRealWorldData, UnifiedRealWorldState } from "@/lib/realWorldSyncEngine";
import ArticleModal from "@/components/ArticleModal";
import CountdownTimer from "@/components/CountdownTimer";

const POPULAR_TOPICS = [
  "Autonomous Agent Swarms",
  "Gemini 2.5 Flash Production Setup",
  "FastAPI & Supabase Architecture",
  "Zero-Shot Hallucination Verification",
  "PyTorch 2.4 GPU Acceleration",
  "DeepSeek R1 Architecture"
];

export default function DashboardHome() {
  const [data, setData] = useState<UnifiedRealWorldState | null>(null);
  const [selectedItem, setSelectedItem] = useState<Article | ResearchPaper | null>(null);
  const [explanation, setExplanation] = useState<AIExplanation | null>(null);
  const [loadingExplanation, setLoadingExplanation] = useState(false);

  const [copiedDaily, setCopiedDaily] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [visitorTopic, setVisitorTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [instantDraft, setInstantDraft] = useState<any>(null);
  const [copiedInstant, setCopiedInstant] = useState(false);

  const loadData = async () => {
    setRefreshing(true);
    const res = await fetchUnifiedRealWorldData();
    setData(res);
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTimerExpire = useCallback(() => {
    loadData();
  }, []);

  const handleOpenItem = async (item: Article | ResearchPaper) => {
    setSelectedItem(item);
    setLoadingExplanation(true);
    setExplanation(null);
    const result = await explainArticleOrPaper(item.title, "abstract" in item ? item.abstract : item.description);
    setExplanation(result);
    setLoadingExplanation(false);
  };

  const handleGenerateInstant = async (customTopic?: string) => {
    const targetTopic = customTopic || visitorTopic;
    if (!targetTopic.trim()) return;
    setGenerating(true);
    setCopiedInstant(false);
    const result = await generateSocialPost(targetTopic, "High impact tech breakdown for LinkedIn professionals", "LinkedIn", "Thought Leadership");
    setInstantDraft(result);
    setGenerating(false);
  };

  const copyText = (text: string, setFn: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Hero Welcome Banner */}
      <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-indigo-950/70 via-purple-950/50 to-slate-900 border border-indigo-500/30 relative overflow-hidden shadow-2xl backdrop-blur-2xl glow-card-border">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-extrabold uppercase">
              <Globe className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Real Live Internet API Ingestion • Gemini 2.5 Flash Engine</span>
            </div>
            <CountdownTimer onExpire={handleTimerExpire} />
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Welcome back, <span className="gradient-text">Saran Krishna</span> 👋
          </h1>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed font-normal">
            Your personalized feed is synchronized live with Hacker News API, arXiv API, and Tech Engineering blogs. Automatically updates every 2 hours.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={loadData}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 hover:from-emerald-500 hover:to-purple-500 text-white text-xs font-black shadow-xl transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              <span>{refreshing ? "Fetching Real Live APIs..." : "Fetch Real Live Internet Data Now"}</span>
            </button>
            <Link
              href="/research"
              prefetch={true}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-extrabold border border-white/10 transition-all"
            >
              <span>AI Research Assistant</span>
              <ArrowUpRight className="w-4 h-4 text-indigo-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURE 1: Daily Featured LinkedIn Post Dynamically Generated from Live Internet Story */}
      {data?.dashboardPost && (
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/30 space-y-4 shadow-2xl glass-panel">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
                <h2 className="text-base font-extrabold text-white">{data.dashboardPost.title}</h2>
                <span className="text-[10px] px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Real Live Story Post
                </span>
              </div>
              <p className="text-xs text-gray-400">Dynamically generated from today&apos;s #1 live story fetched from Hacker News & arXiv.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => copyText(data.dashboardPost.content, setCopiedDaily)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-black shadow-lg transition-all"
              >
                {copiedDaily ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedDaily ? "Copied!" : "Copy Post Draft"}</span>
              </button>
              <a
                href="https://www.linkedin.com/feed/?shareActive=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-bold border border-white/10 transition-all"
              >
                <Send className="w-3.5 h-3.5 text-indigo-400" />
                <span>Post on LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#060913]/90 border border-white/10 text-xs text-gray-200 whitespace-pre-wrap leading-relaxed shadow-inner">
            {data.dashboardPost.content}
          </div>
        </div>
      )}

      {/* FEATURE 2: Instant Visitor Post Generator */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0b1120]/80 border border-white/10 space-y-4 shadow-xl glass-panel">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h2 className="text-base font-extrabold text-white">Instant LinkedIn Draft Generator for Any Topic</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {POPULAR_TOPICS.map((top) => (
            <button
              key={top}
              onClick={() => {
                setVisitorTopic(top);
                handleGenerateInstant(top);
              }}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-indigo-600 hover:text-white text-gray-300 text-xs font-semibold border border-white/10 transition-all shadow-sm"
            >
              + {top}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={visitorTopic}
            onChange={(e) => setVisitorTopic(e.target.value)}
            placeholder="Type any custom topic (e.g. 'Next.js 15 App Router', 'DeepSeek R1', 'Vector RAG')..."
            className="flex-1 px-4 py-3 bg-[#060913] border border-white/10 rounded-2xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => handleGenerateInstant()}
            disabled={generating || !visitorTopic.trim()}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white text-xs font-black shadow-lg disabled:opacity-50 transition-all shrink-0 flex items-center gap-2"
          >
            {generating ? <Sparkles className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{generating ? "Generating..." : "Generate Post"}</span>
          </button>
        </div>

        {instantDraft && (
          <div className="p-5 rounded-2xl bg-[#060913] border border-indigo-500/40 space-y-3 animate-in fade-in shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-indigo-300">{instantDraft.headline}</span>
              <button
                onClick={() => copyText(instantDraft.content, setCopiedInstant)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all"
              >
                {copiedInstant ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedInstant ? "Copied!" : "Copy Post"}</span>
              </button>
            </div>
            <div className="text-xs text-gray-200 whitespace-pre-wrap leading-relaxed p-4 rounded-xl bg-[#0b1120] border border-white/10">
              {instantDraft.content}
            </div>
          </div>
        )}
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-6 rounded-3xl bg-[#0b1120]/70 border border-white/10 hover:border-amber-500/40 transition-all shadow-xl">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400">Learning Streak</span>
            <Flame className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-3xl font-black text-white">12 Days</p>
          <p className="text-[11px] text-emerald-400 font-semibold mt-1">🔥 Top 5% active learner</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0b1120]/70 border border-white/10 hover:border-indigo-500/40 transition-all shadow-xl">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 font-bold">Articles Ingested</span>
            <BookOpen className="w-5 h-5 text-indigo-400" />
          </div>
          <p className="text-3xl font-black text-white">{data?.news.length || 10} Live Stories</p>
          <p className="text-[11px] text-emerald-400 font-semibold mt-1">Live Internet Stream Active</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0b1120]/70 border border-white/10 hover:border-purple-500/40 transition-all shadow-xl">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 font-bold">Posts Scheduled</span>
            <FileText className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-black text-white">3 Queue</p>
          <p className="text-[11px] text-purple-400 font-semibold mt-1">1 published today</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0b1120]/70 border border-white/10 hover:border-emerald-500/40 transition-all shadow-xl">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 font-bold">Active Domains</span>
            <Cpu className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-black text-white">12 Domains</p>
          <p className="text-[11px] text-gray-400 font-medium mt-1">AI, Cloud, Python & DevOps</p>
        </div>
      </div>

      {/* Main Grid: Live Feed & Adoption Radar */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Live Stories */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span>Real Live Tech Stream (Hacker News & arXiv API)</span>
            </h2>
            <Link href="/news" prefetch={true} className="text-xs text-indigo-400 font-bold hover:underline flex items-center gap-1">
              <span>View All Live News</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {data?.news?.map((article: Article) => (
              <div
                key={article.id}
                onClick={() => handleOpenItem(article)}
                className="p-6 rounded-3xl bg-[#0b1120]/60 border border-white/10 hover:border-indigo-500/40 cursor-pointer transition-all duration-200 group glass-card"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-bold">
                    {article.source_name}
                  </span>
                  <span className="text-[11px] text-gray-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    {article.reading_time_minutes} min read
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors mb-2">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed mb-4">
                  {article.description}
                </p>

                {article.related_paper && (
                  <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-[11px] text-purple-300 font-medium mb-3 flex items-center justify-between">
                    <span>🔬 Attached Paper: <strong className="text-white">{article.related_paper.title}</strong></span>
                    <span className="text-amber-400 font-bold shrink-0">{article.related_paper.citation_count} Citations</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    {article.tags?.map(tag => (
                      <span key={tag} className="text-[10px] px-2.5 py-0.5 rounded-lg bg-white/5 text-gray-300 border border-white/5">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-indigo-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    AI Breakdown →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Trending Radar */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#0b1120]/80 border border-white/10 space-y-4 shadow-xl glass-panel">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Live Developer Adoption Radar</span>
            </h3>
            <div className="space-y-3">
              {data?.trendingTech?.map((topic: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div>
                    <p className="text-xs font-bold text-white">{topic.name}</p>
                    <p className="text-[10px] text-gray-400">{topic.category}</p>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    {topic.growth}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ArticleModal
        item={selectedItem}
        explanation={explanation}
        loading={loadingExplanation}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
