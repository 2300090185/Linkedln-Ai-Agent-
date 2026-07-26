"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BrainCircuit, Check, ArrowRight, Sparkles } from "lucide-react";

const DOMAIN_OPTIONS = [
  "Artificial Intelligence", "Machine Learning", "Data Science", "Cybersecurity",
  "Cloud Computing", "AWS", "Azure", "Oracle Cloud", "DevOps", "Kubernetes",
  "Docker", "Python", "Java", "React", "Node.js", "Flutter", "Blockchain",
  "IoT", "Quantum Computing", "Software Engineering", "UI/UX", "HR Technology",
  "Business Analytics", "Digital Marketing", "Healthcare Technology", "FinTech", "Education Technology"
];

export default function OnboardingPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([
    "Artificial Intelligence", "Machine Learning", "Cloud Computing", "Python"
  ]);

  const toggleDomain = (domain: string) => {
    if (selected.includes(domain)) {
      setSelected(selected.filter(d => d !== domain));
    } else {
      setSelected([...selected, domain]);
    }
  };

  const handleFinish = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-gray-900/80 border border-gray-800 rounded-3xl p-8 shadow-2xl space-y-8 backdrop-blur-xl">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
            <BrainCircuit className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Select Your Interest Domains</h1>
          <p className="text-sm text-gray-400">
            Customize your AI Content Intelligence Feed. You can update these anytime in your settings.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 max-h-72 overflow-y-auto p-2 border border-gray-800 rounded-2xl bg-gray-950/50">
          {DOMAIN_OPTIONS.map(domain => {
            const isSelected = selected.includes(domain);
            return (
              <button
                key={domain}
                onClick={() => toggleDomain(domain)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "bg-gray-800/80 text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                <span>{domain}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <span className="text-xs text-gray-400 font-medium">
            {selected.length} domains selected
          </span>
          <button
            onClick={handleFinish}
            disabled={selected.length === 0}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-blue-500/20 disabled:opacity-50 transition-all flex items-center gap-2"
          >
            <span>Continue to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
