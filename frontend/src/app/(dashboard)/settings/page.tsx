"use client";

import { useState } from "react";
import { Settings as SettingsIcon, Check, User, Shield, Bell, Save, Mail, Sparkles } from "lucide-react";
import { INITIAL_PROFILE } from "@/lib/mockData";

const AVAILABLE_DOMAINS = [
  "Artificial Intelligence", "Machine Learning", "Data Science", "Cybersecurity",
  "Cloud Computing", "AWS", "Azure", "Oracle Cloud", "DevOps", "Kubernetes",
  "Docker", "Python", "Java", "React", "Node.js", "Flutter", "Blockchain",
  "IoT", "Quantum Computing", "Software Engineering", "UI/UX", "HR Technology",
  "Business Analytics", "Digital Marketing", "Healthcare Technology", "FinTech", "Education Technology"
];

export default function SettingsPage() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [selectedDomains, setSelectedDomains] = useState<string[]>(INITIAL_PROFILE.domains);
  const [dailyDigest, setDailyDigest] = useState(true);
  const [saved, setSaved] = useState(false);

  const toggleDomain = (domain: string) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter(d => d !== domain));
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in max-w-4xl">
      <div className="border-b border-gray-800 pb-5">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-blue-400" />
          <span>Account & Content Preferences Settings</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Customize your domain interest matrix, target audience persona, and daily automated digest notifications.
        </p>
      </div>

      {/* Domain Selection Matrix */}
      <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Domain Interest Matrix (25+ Categories)</h3>
            <p className="text-xs text-gray-400">Select topics to personalize your dashboard news, papers, and AI content feeds.</p>
          </div>
          <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
            {selectedDomains.length} Domains Selected
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-2">
          {AVAILABLE_DOMAINS.map(domain => {
            const isSelected = selectedDomains.includes(domain);
            return (
              <button
                key={domain}
                onClick={() => toggleDomain(domain)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "bg-gray-800/60 text-gray-400 hover:text-gray-200 hover:bg-gray-800 border border-gray-700/50"
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                <span>{domain}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* User Profile Form */}
      <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <User className="w-5 h-5 text-purple-400" />
          <span>User Profile & Target Audience Persona</span>
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Full Name</label>
            <input
              type="text"
              value={profile.full_name}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-800/80 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-800/80 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Target Audience Persona</label>
          <input
            type="text"
            value={profile.target_audience}
            onChange={(e) => setProfile({ ...profile, target_audience: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-800/80 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Daily Notification Preferences */}
      <div className="p-6 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-emerald-400" />
          <span>Daily Automated Digest & Email Briefings</span>
        </h3>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-800/40 border border-gray-800">
          <div>
            <p className="text-sm font-bold text-white">Daily 8:00 AM LinkedIn Post & Tech Digest Email</p>
            <p className="text-xs text-gray-400">Receive a ready-to-copy LinkedIn post draft directly in your inbox every morning.</p>
          </div>
          <button
            onClick={() => setDailyDigest(!dailyDigest)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              dailyDigest ? "bg-emerald-600 text-white" : "bg-gray-800 text-gray-400"
            }`}
          >
            {dailyDigest ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>

      {/* Save Settings Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2"
        >
          {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{saved ? "Preferences Saved!" : "Save Preferences"}</span>
        </button>
      </div>
    </div>
  );
}
