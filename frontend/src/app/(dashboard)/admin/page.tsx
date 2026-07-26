"use client";

import { ShieldAlert, Rss, FileCode, Terminal, Bell, Plus, CheckCircle2, Activity, Cpu, Database, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState<"diagnostics" | "sources" | "prompts" | "logs">("diagnostics");

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="border-b border-gray-800 pb-5">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-red-400" />
          <span>Admin Platform Infrastructure & System Health</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Monitor live AI model performance, RSS content ingestion, system health heartbeats, and live execution logs (Updated July 26, 2026).
        </p>
      </div>

      {/* Admin Tab Selectors */}
      <div className="flex bg-gray-900 p-1.5 rounded-2xl border border-gray-800 gap-2 max-w-xl">
        <button
          onClick={() => setActiveTab("diagnostics")}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === "diagnostics" ? "bg-blue-600 text-white shadow" : "text-gray-400 hover:text-white"
          }`}
        >
          System Health
        </button>
        <button
          onClick={() => setActiveTab("sources")}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === "sources" ? "bg-blue-600 text-white shadow" : "text-gray-400 hover:text-white"
          }`}
        >
          Sources & Feeds
        </button>
        <button
          onClick={() => setActiveTab("prompts")}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === "prompts" ? "bg-blue-600 text-white shadow" : "text-gray-400 hover:text-white"
          }`}
        >
          Prompt Templates
        </button>
        <button
          onClick={() => setActiveTab("logs")}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === "logs" ? "bg-blue-600 text-white shadow" : "text-gray-400 hover:text-white"
          }`}
        >
          Live Logs
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === "diagnostics" && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Gemini 2.5 Flash Engine</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
              <p className="text-xl font-extrabold text-emerald-400">Operational</p>
              <p className="text-[11px] text-gray-400">Avg Latency: 420ms • 99.9% Success</p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">arXiv Ingestion Pipeline</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <p className="text-xl font-extrabold text-blue-400">Connected</p>
              <p className="text-[11px] text-gray-400">10 Preprints parsed today</p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">RSS Multi-Source Crawler</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <p className="text-xl font-extrabold text-purple-400">Active</p>
              <p className="text-[11px] text-gray-400">35 Articles ingested across 12 feeds</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "sources" && (
        <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Rss className="w-4 h-4 text-blue-400" />
              <span>Configured News & Academic Sources</span>
            </h3>
            <button className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Feed Source
            </button>
          </div>

          <div className="space-y-2">
            {[
              { name: "OpenAI Blog", category: "Tech Company", url: "https://openai.com/blog/rss.xml", status: "Active" },
              { name: "Google AI Blog", category: "Tech Company", url: "https://blog.google/technology/ai/rss/", status: "Active" },
              { name: "TechCrunch AI", category: "Tech Website", url: "https://techcrunch.com/category/artificial-intelligence/feed/", status: "Active" },
              { name: "arXiv Computer Science", category: "Research", url: "http://export.arxiv.org/api/query", status: "Active" },
              { name: "MIT Tech Review", category: "Tech Website", url: "https://www.technologyreview.com/feed/", status: "Active" }
            ].map((source, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-gray-800/40 border border-gray-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">{source.name}</p>
                  <p className="text-gray-400 text-[11px]">{source.url}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-300 px-2 py-0.5 rounded bg-gray-800">{source.category}</span>
                  <span className="text-emerald-400 font-semibold">{source.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "prompts" && (
        <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FileCode className="w-4 h-4 text-purple-400" />
            <span>AI Social Post Prompt Templates</span>
          </h3>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-gray-800/40 border border-gray-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">LinkedIn Thought Leadership Template</span>
                <span className="text-purple-400 font-semibold">Gemini 2.5 Flash</span>
              </div>
              <p className="text-xs text-gray-400 font-mono bg-gray-950 p-3 rounded-xl border border-gray-800">
                Draft an educational, highly engaging LinkedIn post analyzing {"{topic}"} with 3 bullet points, technical impact, and hashtag block.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "logs" && (
        <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Live System Execution Logs (July 26, 2026)</span>
          </h3>
          <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 font-mono text-xs text-gray-300 space-y-2 max-h-80 overflow-y-auto">
            <p className="text-emerald-400">[2026-07-26 13:15:00] INFO NewsService: Parsed 35 feed items from 12 sources successfully.</p>
            <p className="text-blue-400">[2026-07-26 12:45:00] INFO AIService: Gemini 2.5 Flash generated LinkedIn post draft in 420ms.</p>
            <p className="text-emerald-400">[2026-07-26 11:30:00] INFO ResearchService: arXiv query 'cs.AI' retrieved 10 research papers.</p>
            <p className="text-amber-400">[2026-07-26 10:00:00] INFO QuizEngine: Initialized daily quiz 'quiz-2026-07-26' for active users.</p>
          </div>
        </div>
      )}
    </div>
  );
}
