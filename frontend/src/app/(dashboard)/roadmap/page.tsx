"use client";

import { useState, useEffect, useCallback } from "react";
import { Target, CheckCircle2, Sparkles, BookOpen, ExternalLink, RefreshCw, GraduationCap, Award } from "lucide-react";
import { fetchUnifiedRealWorldData, UnifiedRealWorldState, RoadmapModule } from "@/lib/realWorldSyncEngine";
import CountdownTimer from "@/components/CountdownTimer";

export default function LearningRoadmapPage() {
  const [data, setData] = useState<UnifiedRealWorldState | null>(null);
  const [steps, setSteps] = useState<RoadmapModule[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    setRefreshing(true);
    const res = await fetchUnifiedRealWorldData();
    setData(res);
    setSteps(res.roadmapSteps || []);
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTimerExpire = useCallback(() => {
    loadData();
  }, []);

  const toggleStep = (index: number) => {
    const newSteps = [...steps];
    newSteps[index].completed = !newSteps[index].completed;
    setSteps(newSteps);
  };

  const completedCount = steps.filter(s => s.completed).length;
  const progress = steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 0;

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header Banner */}
      <div className="border-b border-white/10 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-indigo-400" />
            <span>Real-World Live AI Roadmaps & Certificate Course Links</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Technical learning modules and engineering methodologies derived live from breaking tech news and arXiv preprints, complete with official certificate course links.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#0b1120] border border-white/10 flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-indigo-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
              <span>Live API Stream Active</span>
            </div>
            <CountdownTimer onExpire={handleTimerExpire} />
          </div>

          <button
            onClick={loadData}
            disabled={refreshing}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg transition-all flex items-center gap-1.5 shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            <span>{refreshing ? "Fetching Real Live API..." : "Fetch Real Live Roadmap Now"}</span>
          </button>
        </div>
      </div>

      {/* Progress Header Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-500/30 space-y-4 shadow-2xl glass-panel">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-white">Live Real-World Engineering Implementation Methodology</h2>
            </div>
            <p className="text-xs text-gray-300">Track your step-by-step module completion progress and earn domain certificates.</p>
          </div>
          <span className="text-3xl font-black text-indigo-400">{progress}%</span>
        </div>

        <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Interactive Step-by-Step Modules with Certificate Links */}
      <div className="space-y-4">
        {steps.map((item, idx) => (
          <div
            key={idx}
            onClick={() => toggleStep(idx)}
            className={`p-6 rounded-3xl border transition-all cursor-pointer flex items-start gap-4 glass-card ${
              item.completed
                ? "bg-indigo-950/30 border-indigo-500/40 shadow-lg shadow-indigo-500/10"
                : "bg-[#0b1120]/60 border-white/10 hover:border-white/20"
            }`}
          >
            <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-xs shrink-0 mt-0.5 ${
              item.completed ? "bg-indigo-600 text-white" : "bg-white/10 text-gray-400"
            }`}>
              {item.completed ? <CheckCircle2 className="w-5 h-5 text-white" /> : item.step}
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className={`text-base font-bold ${item.completed ? "text-white line-through decoration-indigo-500/50 opacity-80" : "text-white"}`}>
                  Module {item.step}: {item.title}
                </h3>
                <span className="text-xs text-gray-400 font-medium">{item.duration}</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{item.description}</p>

              {/* Verified Certificate Course Link Box */}
              <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> Official Certificate Course Link:
                  </span>
                  <p className="text-xs font-extrabold text-white">{item.course_title}</p>
                  <p className="text-[11px] text-gray-400">Provider: {item.course_provider}</p>
                </div>

                <a
                  href={item.course_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white text-xs font-black shadow-md transition-all flex items-center gap-1.5 shrink-0 self-start md:self-auto"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Enroll & Get Certified</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {item.paper_link && (
                <div className="pt-1">
                  <a
                    href={item.paper_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs text-purple-300 font-bold hover:underline"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                    <span>Read Linked arXiv Research Paper</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
