"use client";

import { useState } from "react";
import { Search, Bell, Sun, Moon, Sparkles, User, Command } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [darkMode, setDarkMode] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark");
    }
  };

  return (
    <header className="h-16 border-b border-white/10 bg-[#070b16]/80 backdrop-blur-2xl sticky top-0 z-30 px-6 flex items-center justify-between">
      {/* Search Bar with Keyboard Hint */}
      <div className="relative w-72 lg:w-96">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search news, papers, AI topics (e.g. 'AI Agents')..."
          className="w-full pl-10 pr-12 py-2 bg-white/5 border border-white/10 rounded-2xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 text-[10px] text-gray-400 bg-white/10 px-1.5 py-0.5 rounded-md font-mono border border-white/10">
          <Command className="w-2.5 h-2.5" /> K
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-4">
        {/* Quick Post Generator CTA */}
        <Link
          href="/generator"
          prefetch={true}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white text-xs font-extrabold shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generate Post</span>
        </Link>

        {/* Dark/Light Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
          title="Toggle Theme"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 relative"
          >
            <Bell className="w-4 h-4 text-indigo-300" />
            <span className="w-2 h-2 rounded-full bg-pink-500 absolute top-2 right-2 animate-ping"></span>
            <span className="w-2 h-2 rounded-full bg-pink-500 absolute top-2 right-2"></span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-[#0b1120] border border-white/10 rounded-3xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 backdrop-blur-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h4 className="text-sm font-bold text-white">Notifications</h4>
                <span className="text-xs text-indigo-400 font-semibold cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="py-2 space-y-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs font-bold text-white">Gemini 2.5 Flash Enterprise</p>
                  <p className="text-[11px] text-gray-300 mt-1">Multi-modal AI explainer & 2h auto-sync are active.</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs font-bold text-emerald-400">12-Day Learning Streak! 🔥</p>
                  <p className="text-[11px] text-gray-300 mt-1">You completed today&apos;s interactive developer quiz.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <Link href="/settings" className="flex items-center gap-2.5 pl-3 border-l border-white/10">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-black ring-2 ring-indigo-500/40 shadow-md">
            SK
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-white leading-tight">Saran Krishna</p>
            <p className="text-[10px] text-indigo-400 font-semibold">Admin Pro</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
