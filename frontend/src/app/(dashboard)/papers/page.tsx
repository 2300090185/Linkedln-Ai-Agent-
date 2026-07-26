"use client";

import { useEffect, useState, useCallback } from "react";
import { BookOpen, ExternalLink, Download, Sparkles, Award, Search, RefreshCw, Zap, CheckCircle2, Globe } from "lucide-react";
import { ResearchPaper } from "@/lib/types";
import { explainArticleOrPaper } from "@/lib/api";
import { fetchLiveArxivPapers } from "@/lib/realWorldNewsFetcher";
import ArticleModal from "@/components/ArticleModal";
import CountdownTimer from "@/components/CountdownTimer";
import Link from "next/link";

export default function ResearchPapersPage() {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);
  const [explanation, setExplanation] = useState<any>(null);
  const [loadingExpl, setLoadingExpl] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(false);

  const loadLiveArxiv = async () => {
    setRefreshing(true);
    setToast(false);
    const livePapers = await fetchLiveArxivPapers();
    if (livePapers && livePapers.length > 0) {
      setPapers(livePapers);
    }
    setRefreshing(false);
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  useEffect(() => {
    loadLiveArxiv();
  }, []);

  const handleTimerExpire = useCallback(() => {
    loadLiveArxiv();
  }, []);

  const handleOpenPaper = async (p: ResearchPaper) => {
    setSelectedPaper(p);
    setLoadingExpl(true);
    setExplanation(null);
    const res = await explainArticleOrPaper(p.title, p.abstract, p.publisher);
    setExplanation(res);
    setLoadingExpl(false);
  };

  const filteredPapers = searchQuery.trim() === ""
    ? papers
    : papers.filter(p => `${p.title} ${p.abstract} ${p.authors?.join(" ")}`.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Toast Notification */}
      {toast && (
        <div className="p-4 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center justify-between shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-purple-400" />
            <span>✅ Fetched 10 Real-Time Live Academic Preprints directly from arXiv API!</span>
          </div>
          <span className="text-[10px] bg-purple-500/30 px-2.5 py-1 rounded-md text-white font-mono">
            arXiv API Stream Live
          </span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-purple-400" />
            <span>Real-World Live arXiv Research Stream</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Real-time academic preprints fetched directly from arXiv export API (cs.AI, cs.SE, cs.CR).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#0b1120] border border-white/10 flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-purple-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
              <span>arXiv API Stream Active</span>
            </div>
            <CountdownTimer onExpire={handleTimerExpire} />
          </div>

          <button
            onClick={loadLiveArxiv}
            disabled={refreshing}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg transition-all flex items-center gap-1.5 shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            <span>{refreshing ? "Fetching arXiv API..." : "Fetch Live arXiv Preprints"}</span>
          </button>
        </div>
      </div>

      {/* Header Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-900 border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-400 animate-pulse" />
            <h2 className="text-sm font-bold text-white">Live arXiv API Feed Active</h2>
          </div>
          <p className="text-xs text-gray-300">
            Rendering <strong className="text-purple-400">{filteredPapers.length} real live academic preprints</strong> submitted to arXiv today.
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers (e.g. 'LLM', 'Security')..."
            className="pl-8 pr-4 py-2 bg-[#060913] border border-white/10 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Papers Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredPapers.map(paper => (
          <div
            key={paper.id}
            onClick={() => handleOpenPaper(paper)}
            className="p-6 rounded-3xl bg-[#0b1120]/60 border border-white/10 hover:border-purple-500/50 cursor-pointer transition-all duration-200 group flex flex-col justify-between glass-card"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-bold">
                  {paper.publisher}
                </span>
                <span className="text-[11px] text-amber-400 font-extrabold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  {paper.citation_count} Citations
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                {paper.title}
              </h3>

              <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed">
                {paper.abstract}
              </p>

              <div className="text-[11px] text-gray-400 pt-1">
                <strong className="text-gray-300">Authors:</strong> {paper.authors?.join(", ")}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
              {paper.pdf_url ? (
                <a
                  href={paper.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:text-white font-bold transition-all"
                >
                  <Download className="w-3.5 h-3.5" /> PDF Paper
                </a>
              ) : <span></span>}

              <div className="flex items-center gap-3">
                <Link
                  href={`/generator?topic=${encodeURIComponent(paper.title)}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-indigo-400 font-bold hover:underline"
                >
                  Draft Post →
                </Link>
                <span className="text-purple-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  AI Paper Breakdown ✨
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ArticleModal
        item={selectedPaper}
        explanation={explanation}
        loading={loadingExpl}
        onClose={() => setSelectedPaper(null)}
      />
    </div>
  );
}
