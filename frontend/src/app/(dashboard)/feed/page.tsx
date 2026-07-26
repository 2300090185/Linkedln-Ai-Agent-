"use client";

import { useEffect, useState, useCallback } from "react";
import { Sparkles, Rss, Clock, ExternalLink, RefreshCw, Zap, CheckCircle2, Globe } from "lucide-react";
import { Article } from "@/lib/types";
import { explainArticleOrPaper } from "@/lib/api";
import { fetchLiveHackerNewsArticles } from "@/lib/realWorldNewsFetcher";
import ArticleModal from "@/components/ArticleModal";
import CountdownTimer from "@/components/CountdownTimer";
import Link from "next/link";

const DOMAINS = [
  "All",
  "Artificial Intelligence",
  "Cloud Computing",
  "Cybersecurity",
  "DevOps",
  "Software Engineering"
];

export default function PersonalizedFeedPage() {
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [explanation, setExplanation] = useState<any>(null);
  const [loadingExpl, setLoadingExpl] = useState(false);
  const [toast, setToast] = useState(false);

  const loadFeed = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);
    setToast(false);

    const liveData = await fetchLiveHackerNewsArticles();
    setArticles(liveData);
    setLoading(false);
    setRefreshing(false);
    if (isManual) {
      setToast(true);
      setTimeout(() => setToast(false), 4000);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  const handleTimerExpire = useCallback(() => {
    loadFeed();
  }, []);

  const filteredArticles = selectedDomain === "All"
    ? articles
    : articles.filter(a => {
        const domainLower = selectedDomain.toLowerCase();
        const textToSearch = `${a.title} ${a.description} ${a.tags?.join(" ")} ${a.source_name}`.toLowerCase();
        return textToSearch.includes(domainLower) || (domainLower.includes("ai") && (textToSearch.includes("ai") || textToSearch.includes("llm")));
      });

  const handleArticleClick = async (article: Article) => {
    setSelectedArticle(article);
    setLoadingExpl(true);
    setExplanation(null);
    const res = await explainArticleOrPaper(article.title, article.description, article.source_name);
    setExplanation(res);
    setLoadingExpl(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>✅ Live Feed Updated from Real-World Internet Stream!</span>
          </div>
          <span className="text-[10px] bg-emerald-500/30 px-2.5 py-1 rounded-md text-white font-mono">
            Hacker News API Active
          </span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Rss className="w-6 h-6 text-indigo-400" />
            <span>Personalized Real-World Live Industry Feed</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Real-world tech stream automatically ingesting fresh stories every 2 hours from live Hacker News & arXiv APIs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#0b1120] border border-white/10 flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Live API Stream Active</span>
            </div>
            <CountdownTimer onExpire={handleTimerExpire} />
          </div>

          <button
            onClick={() => loadFeed(true)}
            disabled={refreshing}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 hover:from-emerald-500 hover:to-purple-500 text-white text-xs font-black shadow-lg transition-all flex items-center gap-1.5 shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
            <span>{refreshing ? "Fetching Real Live API..." : "Fetch Real Live Feed Now"}</span>
          </button>
        </div>
      </div>

      {/* Domain Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {DOMAINS.map(domain => (
          <button
            key={domain}
            onClick={() => setSelectedDomain(domain)}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedDomain === domain
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-[#0b1120] border border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            {domain}
          </button>
        ))}
      </div>

      {/* Feed List */}
      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center space-y-2">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-gray-400">Ingesting real-world technology updates from live APIs...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredArticles.map(article => (
            <div
              key={article.id}
              onClick={() => handleArticleClick(article)}
              className="p-6 rounded-3xl bg-[#0b1120]/60 border border-white/10 hover:border-indigo-500/40 cursor-pointer transition-all duration-200 group flex flex-col justify-between glass-card"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-bold">
                    {article.source_name}
                  </span>
                  <span className="text-[11px] text-gray-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    {article.reading_time_minutes} min read
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed">
                  {article.description}
                </p>
              </div>

              {article.related_paper && (
                <div className="mt-3 p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-[11px] text-purple-300">
                  🔬 Attached Paper: <strong className="text-white">{article.related_paper.title}</strong>
                </div>
              )}

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {article.tags?.map(t => (
                    <span key={t} className="text-[10px] px-2.5 py-0.5 rounded-lg bg-white/5 text-gray-300 border border-white/5">
                      #{t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href={`/generator?topic=${encodeURIComponent(article.title)}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-indigo-400 font-bold hover:underline"
                  >
                    Draft Post →
                  </Link>
                  <span className="text-purple-400 font-bold group-hover:translate-x-1 transition-transform">
                    AI Explainer ✨
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ArticleModal
        item={selectedArticle}
        explanation={explanation}
        loading={loadingExpl}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
}
