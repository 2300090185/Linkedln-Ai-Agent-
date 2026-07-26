"use client";

import { useState } from "react";
import { X, Sparkles, BookOpen, ExternalLink, Bookmark, CheckCircle, Clock, Zap, Target, Layers, Play, Pause, Volume2, Award, Download, FileText } from "lucide-react";
import { Article, ResearchPaper, AIExplanation } from "@/lib/types";

interface ArticleModalProps {
  item: Article | ResearchPaper | null;
  explanation: AIExplanation | null;
  loading: boolean;
  onClose: () => void;
}

export default function ArticleModal({ item, explanation, loading, onClose }: ArticleModalProps) {
  const [activeTier, setActiveTier] = useState<"beginner" | "intermediate" | "expert">("intermediate");
  const [isPlaying, setIsPlaying] = useState(false);

  if (!item) return null;

  const relatedPaper = "related_paper" in item ? item.related_paper : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-gray-900 border border-gray-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Header Bar */}
        <div className="sticky top-0 bg-gray-900/90 backdrop-blur-md px-6 py-4 border-b border-gray-800 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
              {"publisher" in item ? item.publisher : item.source_name}
            </span>
            <span className="text-xs text-gray-400">
              {"published_date" in item ? new Date(item.published_date).toLocaleDateString() : "Recent"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Article Title & Link */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <h2 className="text-xl font-bold text-white leading-snug">{item.title}</h2>
              <a
                href={`/generator?topic=${encodeURIComponent(item.title)}`}
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Turn into LinkedIn Post</span>
              </a>
            </div>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:underline font-medium"
            >
              <span>Read Original Source</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Attached Relevant Research Paper Box */}
          {relatedPaper && (
            <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">🔬 Relevant arXiv Research Paper Attached</span>
                </div>
                <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  {relatedPaper.citation_count} Citations
                </span>
              </div>
              <p className="text-sm font-bold text-purple-300">{relatedPaper.title}</p>
              <p className="text-xs text-gray-300 line-clamp-2">{relatedPaper.abstract}</p>
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-gray-400">Authors: {relatedPaper.authors?.join(", ")}</span>
                {relatedPaper.pdf_url && (
                  <a
                    href={relatedPaper.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-purple-300 hover:underline font-bold"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF Paper
                  </a>
                )}
              </div>
            </div>
          )}

          {/* AI Audio Briefing Player Widget */}
          <div className="p-4 rounded-2xl bg-gray-800/60 border border-gray-700/60 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 transition-all shrink-0"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>AI Voice Summary Briefing</span>
                </p>
                <p className="text-[11px] text-gray-400">2 min automated audio summary</p>
              </div>
            </div>
            {isPlaying && (
              <div className="flex items-center gap-1">
                <span className="w-1 h-4 bg-blue-400 animate-pulse"></span>
                <span className="w-1 h-6 bg-purple-400 animate-pulse delay-75"></span>
                <span className="w-1 h-3 bg-emerald-400 animate-pulse delay-150"></span>
              </div>
            )}
          </div>

          {/* AI Explanation Engine Header */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-purple-950/40 to-indigo-950/40 border border-blue-500/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
                <h3 className="font-semibold text-white text-sm">AI Learning Assistant (Gemini 2.5 Flash)</h3>
              </div>
              {explanation && (
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs text-gray-300">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    {explanation.estimated_reading_time_minutes} min read
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[11px] font-semibold">
                    {explanation.difficulty_level}
                  </span>
                </div>
              )}
            </div>

            {loading ? (
              <div className="py-8 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs text-gray-400">Synthesizing 3-tier difficulty analysis...</p>
              </div>
            ) : explanation ? (
              <div className="space-y-4">
                {/* 3-Tier Difficulty Selector */}
                <div className="flex bg-gray-900/60 p-1 rounded-xl border border-gray-800">
                  <button
                    onClick={() => setActiveTier("beginner")}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeTier === "beginner" ? "bg-emerald-600 text-white shadow" : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    🟢 Beginner
                  </button>
                  <button
                    onClick={() => setActiveTier("intermediate")}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeTier === "intermediate" ? "bg-blue-600 text-white shadow" : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    🔵 Intermediate
                  </button>
                  <button
                    onClick={() => setActiveTier("expert")}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeTier === "expert" ? "bg-purple-600 text-white shadow" : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    🟣 Expert Deep-Dive
                  </button>
                </div>

                {/* Explanation Content Box */}
                <div className="p-4 rounded-xl bg-gray-900/80 border border-gray-800 text-sm text-gray-300 leading-relaxed">
                  {activeTier === "beginner" && <p>{explanation.beginner_explanation}</p>}
                  {activeTier === "intermediate" && <p>{explanation.intermediate_explanation}</p>}
                  {activeTier === "expert" && <p>{explanation.expert_explanation}</p>}
                </div>
              </div>
            ) : null}
          </div>

          {/* Key Takeaways */}
          {explanation && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Key Takeaways</span>
                </h4>
                <ul className="space-y-2">
                  {explanation.key_takeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-300 bg-gray-800/40 p-2.5 rounded-xl border border-gray-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Real World Applications & Learning Roadmap */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-gray-800/30 border border-gray-800">
                  <h4 className="text-xs font-semibold text-white flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Real-World Applications</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-400">
                    {explanation.real_world_applications.map((app, idx) => (
                      <li key={idx}>• {app}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-gray-800/30 border border-gray-800">
                  <h4 className="text-xs font-semibold text-white flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-purple-400" />
                    <span>Suggested Roadmap</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-400">
                    {explanation.suggested_learning_roadmap.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
