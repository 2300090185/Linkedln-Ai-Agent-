"use client";

import { useState, useEffect, useCallback } from "react";
import { GraduationCap, Flame, CheckCircle2, Trophy, HelpCircle, Check, X, Sparkles, Award, Download, RefreshCw, QrCode, Globe } from "lucide-react";
import { fetchUnifiedRealWorldData, UnifiedRealWorldState } from "@/lib/realWorldSyncEngine";
import CertificateModal from "@/components/CertificateModal";
import CountdownTimer from "@/components/CountdownTimer";

export default function LearningHubPage() {
  const [data, setData] = useState<UnifiedRealWorldState | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);

  // User Stats
  const [streakDays, setStreakDays] = useState(12);
  const [xpPoints, setXpPoints] = useState(1450);
  const [completedCyclesCount, setCompletedCyclesCount] = useState(3);

  // Quiz Execution State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, { selected: number; correct: boolean }>>({});
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    setRefreshing(true);
    const res = await fetchUnifiedRealWorldData();
    setData(res);
    setCurrentQIndex(0);
    setAnsweredQuestions({});
    setSelectedOption(null);
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTimerExpire = useCallback(() => {
    loadData();
  }, []);

  const handleSelectOption = (index: number) => {
    if (answeredQuestions[currentQIndex]) return;
    setSelectedOption(index);
  };

  const questions = data?.quizQuestions || [];
  const currentQ = questions[currentQIndex];
  const isCurrentAnswered = answeredQuestions[currentQIndex] !== undefined;

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentQ || isCurrentAnswered) return;

    const isCorrect = selectedOption === currentQ.correct_index;
    setAnsweredQuestions(prev => ({
      ...prev,
      [currentQIndex]: { selected: selectedOption, correct: isCorrect }
    }));

    if (isCorrect) {
      setXpPoints(prev => prev + currentQ.xp_reward);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setCompletedCyclesCount(prev => prev + 1);
      setStreakDays(prev => prev + 1);
    }
  };

  let badgeTitle = "🥉 AI Novice Explorer";
  let badgeColor = "text-amber-400 border-amber-500/30 bg-amber-500/10";
  if (xpPoints >= 3000) {
    badgeTitle = "💎 NexusAI Fellow Scholar";
    badgeColor = "text-pink-400 border-pink-500/30 bg-pink-500/10";
  } else if (xpPoints >= 1500) {
    badgeTitle = "🥇 AI Systems Architect";
    badgeColor = "text-indigo-400 border-indigo-500/30 bg-indigo-500/10";
  } else if (xpPoints >= 500) {
    badgeTitle = "🥈 Tech Specialist";
    badgeColor = "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
  }

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-amber-400" />
            <span>Real-World Live Quiz & Certification Hub</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Solve 5 dynamic questions derived directly from live Hacker News & arXiv stories. Earn XP, unlock badges, and download verified certificates!
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
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg transition-all flex items-center gap-1.5 shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            <span>{refreshing ? "Fetching Real Live Quiz..." : "Fetch Real Live Quiz Now"}</span>
          </button>
        </div>
      </div>

      {/* Streak & XP Banners */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-gradient-to-tr from-amber-950/40 via-[#0b1120] to-[#0b1120] border border-amber-500/30 flex items-center gap-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
            <Flame className="w-8 h-8 text-amber-400 animate-bounce" />
          </div>
          <div>
            <p className="text-[11px] text-gray-400 font-extrabold uppercase tracking-wider">Active Streak</p>
            <h3 className="text-3xl font-black text-white">{streakDays} Days</h3>
            <p className="text-[11px] text-amber-400 font-semibold mt-0.5">🔥 Top 5% Learner</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0b1120]/70 border border-white/10 flex items-center gap-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0">
            <Award className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <p className="text-[11px] text-gray-400 font-extrabold uppercase tracking-wider">Total XP Earned</p>
            <h3 className="text-3xl font-black text-white">{xpPoints} XP</h3>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold border inline-block mt-1 ${badgeColor}`}>
              {badgeTitle}
            </span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0b1120]/70 border border-white/10 flex items-center gap-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0">
            <Trophy className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <p className="text-[11px] text-gray-400 font-extrabold uppercase tracking-wider">Completed Quizzes</p>
            <h3 className="text-3xl font-black text-white">{completedCyclesCount} Cycles</h3>
            <p className="text-[11px] text-purple-300 font-semibold mt-0.5">Live Real-World Quiz Stream</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/60 via-purple-950/40 to-[#0b1120] border border-indigo-500/40 flex flex-col justify-between shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-extrabold">
              <QrCode className="w-4 h-4 text-indigo-400" />
              <span>Verified Certificate</span>
            </div>
            <p className="text-[11px] text-gray-300">Auto-Download PDF with QR Verification Code</p>
          </div>

          <button
            onClick={() => setShowCertificateModal(true)}
            className="mt-3 w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white text-xs font-black shadow-lg transition-all flex items-center justify-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Get Certificate PDF</span>
          </button>
        </div>
      </div>

      {/* 5-Question Quiz Stepper */}
      {questions.length > 0 && currentQ && (
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/30 space-y-6 shadow-2xl glass-panel">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-extrabold text-white">
                  🧠 Real Live Internet Tech Quiz (Question {currentQIndex + 1} of {questions.length})
                </h2>
              </div>
              <p className="text-xs text-indigo-300 font-semibold">
                Topic Domain: {currentQ.topic}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                {questions.map((_, idx) => {
                  const state = answeredQuestions[idx];
                  let dotBg = "bg-white/10 border-white/20";
                  if (state) {
                    dotBg = state.correct ? "bg-emerald-500 border-emerald-400" : "bg-red-500 border-red-400";
                  } else if (idx === currentQIndex) {
                    dotBg = "bg-indigo-500 border-indigo-400 animate-pulse";
                  }
                  return (
                    <div
                      key={idx}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`w-7 h-7 rounded-xl border flex items-center justify-center text-[10px] font-extrabold text-white cursor-pointer transition-all ${dotBg}`}
                    >
                      {idx + 1}
                    </div>
                  );
                })}
              </div>

              <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/30">
                +{currentQ.xp_reward} XP
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-base font-extrabold text-white leading-relaxed">
              {currentQ.question}
            </p>

            <div className="space-y-2.5">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correct_index;
                let btnClass = "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10";

                if (isCurrentAnswered) {
                  if (isCorrect) {
                    btnClass = "bg-emerald-950/80 border-emerald-500 text-emerald-300 font-extrabold";
                  } else if (answeredQuestions[currentQIndex]?.selected === idx) {
                    btnClass = "bg-red-950/80 border-red-500 text-red-300";
                  }
                } else if (isSelected) {
                  btnClass = "bg-indigo-600/30 border-indigo-500 text-white font-extrabold";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border text-xs text-left transition-all flex items-center justify-between ${btnClass}`}
                  >
                    <span>{option}</span>
                    {isCurrentAnswered && isCorrect && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                    {isCurrentAnswered && answeredQuestions[currentQIndex]?.selected === idx && !isCorrect && <X className="w-4 h-4 text-red-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-3">
              {!isCurrentAnswered ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-black shadow-lg disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit Answer (+{currentQ.xp_reward} XP)</span>
                </button>
              ) : (
                <div className="w-full space-y-3">
                  <div className="p-4 rounded-2xl bg-[#060913] border border-white/10 text-xs space-y-1.5 animate-in fade-in">
                    <div className="flex items-center gap-2">
                      {answeredQuestions[currentQIndex]?.correct ? (
                        <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Correct Answer! +100 XP Awarded!
                        </span>
                      ) : (
                        <span className="text-red-400 font-extrabold flex items-center gap-1">
                          <X className="w-4 h-4" /> Incorrect. Architecture Explanation:
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 leading-relaxed">{currentQ.explanation}</p>
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white text-xs font-black shadow-lg transition-all flex items-center gap-2"
                  >
                    <span>{currentQIndex < questions.length - 1 ? "Next Question →" : "Finish Quiz & Claim Badge"}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <CertificateModal
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        userName="Saran Krishna"
        badgeTitle={badgeTitle}
        xpPoints={xpPoints}
      />
    </div>
  );
}
