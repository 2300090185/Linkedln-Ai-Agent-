"use client";

import { Bookmark, ExternalLink, Trash2, Download, Sparkles, FolderDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const INITIAL_BOOKMARKS = [
  {
    id: "bm-001",
    title: "Zero-Shot Formal Verification of LLM Code Output",
    type: "Research Paper",
    publisher: "ACM Digital Library",
    url: "https://dl.acm.org",
    saved_at: "July 26, 2026"
  },
  {
    id: "bm-002",
    title: "FastAPI & Supabase High Scale Architecture Guide",
    type: "Article",
    publisher: "InfoQ",
    url: "https://infoq.com",
    saved_at: "July 25, 2026"
  },
  {
    id: "bm-003",
    title: "OpenAI Multi-Agent Swarm Orchestration Framework v2",
    type: "Article",
    publisher: "OpenAI",
    url: "https://openai.com/blog",
    saved_at: "July 24, 2026"
  }
];

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState(INITIAL_BOOKMARKS);

  const removeBookmark = (id: string) => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
  };

  const handleExportVault = () => {
    const markdownContent = `# My Personal Knowledge Vault & Saved Articles\nExported on ${new Date().toLocaleDateString()}\n\n` +
      bookmarks.map(b => `- **[${b.type}] ${b.title}** (${b.publisher})\n  URL: ${b.url}\n  Saved: ${b.saved_at}`).join("\n\n");
    
    const element = document.createElement("a");
    const file = new Blob([markdownContent], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `knowledge-vault-${Date.now()}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-amber-400" />
            <span>Saved Knowledge Vault & Bookmarks</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Your bookmarked articles, research papers, and reference reading list updated for July 26, 2026.
          </p>
        </div>

        <button
          onClick={handleExportVault}
          disabled={bookmarks.length === 0}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-200 border border-gray-700 transition-all self-start md:self-auto"
        >
          <FolderDown className="w-4 h-4 text-amber-400" />
          <span>Export Vault (.md)</span>
        </button>
      </div>

      <div className="space-y-3">
        {bookmarks.map(item => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 flex items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-semibold border border-amber-500/20">
                  {item.type}
                </span>
                <span className="text-[11px] text-gray-400">{item.publisher}</span>
              </div>
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              <p className="text-[11px] text-gray-400">Saved on {item.saved_at}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/generator?topic=${encodeURIComponent(item.title)}`}
                className="text-xs text-blue-400 hover:underline font-semibold"
              >
                Draft Post →
              </Link>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
                title="Read Source"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => removeBookmark(item.id)}
                className="p-2 rounded-xl bg-gray-800 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                title="Remove Bookmark"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {bookmarks.length === 0 && (
          <div className="py-12 text-center text-gray-400 text-xs">
            Your knowledge vault is currently empty. Bookmark articles or research papers to save them here!
          </div>
        )}
      </div>
    </div>
  );
}
