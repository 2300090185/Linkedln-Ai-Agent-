"use client";

import { FileText, Copy, Check, Share2, Sparkles, Clock, Calendar, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { MOCK_POSTS, POST_SCHEDULE_ITEMS } from "@/lib/mockData";
import Link from "next/link";

export default function MyGeneratedPostsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "scheduled" | "published" | "draft">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPosts = activeTab === "all"
    ? MOCK_POSTS
    : MOCK_POSTS.filter(p => p.status === activeTab);

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="border-b border-gray-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-400" />
            <span>Daily Content Calendar & Post Queue Manager</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Review, copy, schedule, and track your AI-crafted LinkedIn posts, Twitter threads, and newsletters. Updated for July 26, 2026.
          </p>
        </div>

        <Link
          href="/generator"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Craft New Post</span>
        </Link>
      </div>

      {/* Recommended Posting Slots Banner */}
      <div className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Today&apos;s Optimal Posting Times (July 26, 2026)</span>
          </h2>
          <span className="text-[10px] text-gray-400">Calculated from historical engagement velocity</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {POST_SCHEDULE_ITEMS.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.scheduled_time}
                </span>
                {item.is_published ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">Published</span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">Queue Active</span>
                )}
              </div>
              <p className="text-xs text-white font-medium">{item.post.headline}</p>
              <p className="text-[11px] text-gray-400">{item.target_slot}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-gray-900 p-1.5 rounded-2xl border border-gray-800 gap-2 max-w-md">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === "all" ? "bg-blue-600 text-white shadow" : "text-gray-400 hover:text-white"
          }`}
        >
          All ({MOCK_POSTS.length})
        </button>
        <button
          onClick={() => setActiveTab("scheduled")}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === "scheduled" ? "bg-blue-600 text-white shadow" : "text-gray-400 hover:text-white"
          }`}
        >
          Scheduled ({MOCK_POSTS.filter(p => p.status === "scheduled").length})
        </button>
        <button
          onClick={() => setActiveTab("published")}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === "published" ? "bg-blue-600 text-white shadow" : "text-gray-400 hover:text-white"
          }`}
        >
          Published ({MOCK_POSTS.filter(p => p.status === "published").length})
        </button>
        <button
          onClick={() => setActiveTab("draft")}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === "draft" ? "bg-blue-600 text-white shadow" : "text-gray-400 hover:text-white"
          }`}
        >
          Drafts ({MOCK_POSTS.filter(p => p.status === "draft").length})
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map(post => (
          <div
            key={post.id}
            className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
                  {post.platform}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
                  {post.writing_style}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(post.id, post.content)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-blue-400 border border-gray-700 transition-colors"
                >
                  {copiedId === post.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === post.id ? "Copied!" : "Copy Post"}</span>
                </button>
                <a
                  href="https://www.linkedin.com/feed/?shareActive=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Now</span>
                </a>
              </div>
            </div>

            <h3 className="text-base font-bold text-white">{post.headline}</h3>

            <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800 text-xs text-gray-300 whitespace-pre-wrap leading-relaxed">
              {post.content}
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-800/60">
              <span>Status: <strong className="text-emerald-400 capitalize">{post.status}</strong></span>
              <span>Created on {new Date(post.created_at).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
