"use client";

import { useState } from "react";
import { Search, Sparkles, Code2, BookOpen, Video, FileCode, ExternalLink, RefreshCw } from "lucide-react";
import { searchAIResearch } from "@/lib/api";

export default function AIResearchAssistantPage() {
  const [query, setQuery] = useState("AI Agents");
  const [loading, setLoading] = useState(false);
  const [dossier, setDossier] = useState<any>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const result = await searchAIResearch(query);
    setDossier(result);
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="border-b border-gray-800 pb-5">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Search className="w-6 h-6 text-indigo-400" />
          <span>AI Research Assistant</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Instant multi-source research dossier synthesizing news, papers, GitHub projects, documentation, and talks.
        </p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="relative max-w-2xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any technology topic (e.g. 'AI Agents', 'Quantum Computing')..."
          className="w-full pl-5 pr-32 py-3.5 bg-gray-900 border border-gray-800 rounded-2xl text-sm text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 shadow-xl"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
        >
          {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          <span>Synthesize</span>
        </button>
      </form>

      {/* Dossier Results */}
      {dossier && (
        <div className="space-y-6">
          {/* Executive AI Synthesis Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-gray-900 border border-indigo-500/30 space-y-3 shadow-xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base font-bold text-white">Gemini Executive Synthesis</h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {dossier.ai_synthesis}
            </p>
          </div>

          {/* Grid Layout for GitHub Repos & Research Papers */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Repositories */}
            <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-400" />
                <span>Recommended Open Source Projects</span>
              </h3>
              <div className="space-y-3">
                {dossier.recommended_repositories?.map((repo: any, idx: number) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-gray-800/40 border border-gray-800 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">{repo.name}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{repo.description}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-amber-400 font-bold shrink-0">
                      ★ {repo.stars}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Papers */}
            <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>Key Research Papers</span>
              </h3>
              <div className="space-y-3">
                {dossier.key_research_papers?.map((paper: any, idx: number) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-gray-800/40 border border-gray-800 space-y-1">
                    <p className="text-xs font-bold text-white">{paper.title}</p>
                    <p className="text-[11px] text-gray-400">{paper.authors} ({paper.year}) • {paper.citation_count} Citations</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
