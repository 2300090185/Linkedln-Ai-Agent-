"use client";

import React, { useRef } from "react";
import { X, Download, ShieldCheck, Award, Sparkles, CheckCircle2, QrCode } from "lucide-react";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  badgeTitle?: string;
  xpPoints?: number;
}

export default function CertificateModal({
  isOpen,
  onClose,
  userName = "Saran Krishna",
  badgeTitle = "AI Systems Architect & Fellow",
  xpPoints = 1950
}: CertificateModalProps) {
  const certRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const certId = `NEXUS-CERT-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  const issueDate = "July 26, 2026";
  const verifyUrl = `http://localhost:3000/verify/${certId}`;

  const handleDownloadPDF = () => {
    // Triggers browser print to PDF or downloads certificate DOM snapshot
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0b1120] border border-white/10 rounded-3xl max-w-3xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Action Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400 animate-pulse" />
            <h2 className="text-lg font-bold text-white">Official Verified Skill Certificate</h2>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Certificate (PDF)</span>
          </button>
        </div>

        {/* CERTIFICATE CANVAS DOM TO PRINT */}
        <div
          ref={certRef}
          className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#060913] via-[#0b1120] to-[#12192e] border-2 border-amber-500/40 relative overflow-hidden shadow-2xl space-y-6 text-center print:text-black print:bg-white"
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-amber-500/60 rounded-tl-xl pointer-events-none"></div>
          <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-amber-500/60 rounded-tr-xl pointer-events-none"></div>
          <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-amber-500/60 rounded-bl-xl pointer-events-none"></div>
          <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-amber-500/60 rounded-br-xl pointer-events-none"></div>

          {/* Platform Seal */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <span className="font-extrabold text-xl tracking-wider text-white">NexusAI</span>
              <p className="text-[10px] text-amber-400 uppercase font-mono tracking-widest -mt-1">Verified Credential</p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Certificate of Educational Achievement</p>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              SPECIALIST IN AUTONOMOUS AI & arXiv RESEARCH
            </h1>
          </div>

          <div className="py-2">
            <p className="text-xs text-gray-400 italic">This is proudly presented to</p>
            <h2 className="text-3xl md:text-4xl font-extrabold gradient-text mt-1">
              {userName}
            </h2>
            <p className="text-xs text-indigo-300 font-semibold mt-2 max-w-xl mx-auto">
              For completing 2-hour technical quizzes, mastering deep learning research papers, and demonstrating operational excellence in AI system architecture with <strong className="text-amber-400">{xpPoints} XP</strong>.
            </p>
          </div>

          {/* Certificate Badge Metadata & QR Code */}
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Status: ACTIVE & VALID</span>
              </div>
              <p className="text-[11px] text-gray-400">Issue Date: <strong className="text-white">{issueDate}</strong></p>
              <p className="text-[11px] text-gray-400">Credential ID: <strong className="text-indigo-400 font-mono">{certId}</strong></p>
              <p className="text-[11px] text-gray-400">Badge Awarded: <strong className="text-amber-400">{badgeTitle}</strong></p>
            </div>

            {/* Verification QR Code Box */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-14 h-14 bg-white p-1 rounded-xl flex items-center justify-center shrink-0">
                {/* SVG QR Code */}
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h6v6H3V3zm12 0h6v6h-6V3zM3 15h6v6H3v-6zm14 0h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm-4-4h2v2h-2v-2zm0 4h2v2h-2v-2zm2-2h2v2h-2v-2z" fill="#0f172a" />
                </svg>
              </div>
              <div className="text-[10px] text-gray-300 space-y-0.5">
                <p className="font-bold text-white flex items-center gap-1">
                  <QrCode className="w-3 h-3 text-indigo-400" /> Scan to Verify
                </p>
                <p className="text-gray-400">NexusAI Verification Network</p>
                <p className="text-indigo-400 font-mono hover:underline">{verifyUrl}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
