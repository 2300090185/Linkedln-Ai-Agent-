"use client";

import { useState, useEffect, useCallback } from "react";
import { TrendingUp, ExternalLink, Hash, Zap, Sparkles, Search, GraduationCap, RefreshCw } from "lucide-react";
import Link from "next/link";
import { HASHTAG_TRENDS } from "@/lib/mockData";
import { fetchUnifiedRealWorldData, UnifiedRealWorldState } from "@/lib/realWorldSyncEngine";
import CountdownTimer from "@/components/CountdownTimer";

const SPECIALIZATION_CATEGORIES = [
  "All Specializations",
  "Full Stack & Web",
  "Cloud & DevOps"
];

export default function TrendingTechPage() {
  const [data, setData] = useState<UnifiedRealWorldState | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All Specializations");
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

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

  const filteredTrends = (data?.trendingTech || []).filter(item => {
    const matchesCategory = selectedCategory === "All Specializations" || item.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === "" ||
      `${item.name} ${item.category} ${item.latest_news} ${item.skills_takeaway}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header Banner */}
      <div className="border-b border-white/10 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            <span>Real-World Live Trending Tech Radar</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Real-world technology trends, domain releases, and student skill takeaways automatically updated from live Hacker News & arXiv APIs.
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
            onClick={loadData}
            disabled={refreshing}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg transition-all flex items-center gap-1.5 shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            <span>{refreshing ? "Fetching Real Live APIs..." : "Fetch Real Live Radar Now"}</span>
          </button>
        </div>
      </div>

      {/* Specialization News & Skill Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <span>Real-World Live Technology Trends & Student Skill Takeaways</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrends.map((item, idx) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-[#0b1120]/60 border border-white/10 hover:border-emerald-500/40 transition-all space-y-4 flex flex-col justify-between glass-card"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[10px] font-bold text-purple-300 bg-purple-500/20 border border-purple-500/30 px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                    🌐 Real Live Domain
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">{item.name}</h3>

                <div className="p-3 rounded-2xl bg-[#060913] border border-white/10 space-y-1">
                  <p className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Latest Live Story:</p>
                  <p className="text-xs text-gray-300 leading-relaxed">{item.latest_news}</p>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                  <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" /> Key Skill Takeaway for Students:
                  </p>
                  <p className="text-xs text-emerald-200 leading-relaxed">{item.skills_takeaway}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <Link
                  href={`/generator?topic=${encodeURIComponent(`${item.name}: Key career insights for ${item.category}`)}`}
                  className="text-indigo-400 font-bold hover:underline"
                >
                  Draft Post →
                </Link>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-semibold hover:underline flex items-center gap-1"
                >
                  Source Link <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
