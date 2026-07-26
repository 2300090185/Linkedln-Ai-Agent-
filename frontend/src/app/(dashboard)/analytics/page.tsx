"use client";

import { BarChart2, BookOpen, Sparkles, Flame, Clock, Eye, TrendingUp, Award, Share2 } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

const WEEKLY_DATA = [
  { day: "Mon", reading: 25, posts: 2, impressions: 1200 },
  { day: "Tue", reading: 40, posts: 4, impressions: 3400 },
  { day: "Wed", reading: 30, posts: 3, impressions: 2800 },
  { day: "Thu", reading: 50, posts: 5, impressions: 5100 },
  { day: "Fri", reading: 20, posts: 1, impressions: 1900 },
  { day: "Sat", reading: 15, posts: 1, impressions: 1400 },
  { day: "Sun (Today)", reading: 35, posts: 2, impressions: 4200 }
];

const CATEGORY_DATA = [
  { name: "Artificial Intelligence", value: 40, color: "#3b82f6" },
  { name: "Cloud Computing", value: 25, color: "#8b5cf6" },
  { name: "Software Engineering", value: 20, color: "#10b981" },
  { name: "Cybersecurity", value: 15, color: "#f59e0b" }
];

const TOP_PERFORMING_POSTS = [
  { title: "🚀 How Gemini 2.5 Flash Slashes Inference Latency by 45%", impressions: "5,420", reactions: "340", shares: "42", date: "July 26, 2026" },
  { title: "💡 Why Asynchronous Python Backends Dominate AI Workloads", impressions: "3,890", reactions: "215", shares: "28", date: "July 24, 2026" },
  { title: "🧵 Scaling Multi-Agent Systems to 1,000+ Swarms", impressions: "4,120", reactions: "280", shares: "35", date: "July 22, 2026" }
];

export default function AnalyticsDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="border-b border-gray-800 pb-5">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-blue-400" />
          <span>Analytics & Engagement Velocity Dashboard</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Track learning performance, profile reach velocity, daily reading duration, and post engagement analytics (Updated July 26, 2026).
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-1">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase">Daily Impressions</span>
            <Eye className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">4,200</p>
          <p className="text-[11px] text-emerald-400">+24% vs yesterday</p>
        </div>

        <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-1">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase">Posts Generated</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-extrabold text-blue-400">18 Posts</p>
          <p className="text-[11px] text-purple-400">+3 generated this week</p>
        </div>

        <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-1">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase">Total Reading Time</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-400">4.5 hrs</p>
          <p className="text-[11px] text-gray-400">34 articles read</p>
        </div>

        <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-1">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase">Active Streak</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-amber-400">12 Days 🔥</p>
          <p className="text-[11px] text-amber-300">Top 5% continuous reader</p>
        </div>
      </div>

      {/* Recharts Visualizations */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Weekly Reading Activity Chart */}
        <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span>Weekly Engagement & Reading Minutes</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_DATA}>
                <XAxis dataKey="day" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: "#111827", borderColor: "#1f2937" }} />
                <Bar dataKey="reading" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Reading Mins" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Pie Chart */}
        <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>Most Active Topic Categories</span>
          </h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={CATEGORY_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#111827", borderColor: "#1f2937" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Performing Posts Table */}
      <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span>Top Performing Published Content</span>
        </h3>

        <div className="space-y-3">
          {TOP_PERFORMING_POSTS.map((post, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-gray-800/40 border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-bold text-white">{post.title}</p>
                <p className="text-gray-400 text-[11px]">Published on {post.date}</p>
              </div>
              <div className="flex items-center gap-4 text-gray-300 font-semibold">
                <span>👁️ {post.impressions} Impressions</span>
                <span>👍 {post.reactions} Likes</span>
                <span>🔁 {post.shares} Shares</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
