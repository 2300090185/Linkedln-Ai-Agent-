"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Rss, 
  Newspaper, 
  BookOpen, 
  TrendingUp, 
  GraduationCap, 
  Target,
  Sparkles, 
  Search, 
  Bookmark, 
  FileText, 
  BarChart2, 
  Settings, 
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  BrainCircuit,
  Zap
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Personalized Feed", href: "/feed", icon: Rss },
  { label: "Latest Tech News", href: "/news", icon: Newspaper },
  { label: "Research Papers", href: "/papers", icon: BookOpen },
  { label: "Trending Tech", href: "/trending", icon: TrendingUp },
  { label: "Learning Hub", href: "/learning", icon: GraduationCap },
  { label: "AI Roadmaps", href: "/roadmap", icon: Target },
  { label: "AI Post Generator", href: "/generator", icon: Sparkles },
  { label: "AI Research Assistant", href: "/research", icon: Search },
  { label: "Saved Articles", href: "/bookmarks", icon: Bookmark },
  { label: "My Generated Posts", href: "/posts", icon: FileText },
  { label: "Analytics", href: "/analytics", icon: BarChart2 },
  { label: "Admin Panel", href: "/admin", icon: ShieldAlert },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-[#070b16]/90 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          <Link href="/dashboard" prefetch={true} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 ring-1 ring-white/20 group-hover:scale-110 transition-transform">
              <BrainCircuit className="w-6 h-6 text-white animate-pulse" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight gradient-text">
                  NexusAI
                </span>
                <span className="text-[9px] uppercase tracking-widest text-indigo-400 font-bold -mt-1">
                  Ultra Edition
                </span>
              </div>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10 active:scale-95"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-semibold text-xs transition-all duration-200 active:scale-95 hover:translate-x-1.5 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-pink-600/20 text-white border border-indigo-500/40 shadow-[0_0_20px_-3px_rgba(99,102,241,0.35)]"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? "text-indigo-400" : "text-gray-400"}`} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Gemini Active Badge */}
      {!collapsed && (
        <div className="p-4 border-t border-white/10 m-3 rounded-3xl bg-gradient-to-br from-indigo-950/50 via-purple-950/40 to-slate-900 border border-indigo-500/30 shadow-lg shadow-indigo-950/50 hover:scale-[1.02] transition-transform">
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
            <span className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider">Gemini 2.5 Flash</span>
          </div>
          <p className="text-[10px] text-gray-300 flex items-center gap-1 font-medium">
            <Zap className="w-3 h-3 text-amber-400" /> Ultra Enterprise Engine Active
          </p>
        </div>
      )}
    </aside>
  );
}
