"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  initialSeconds?: number;
  onExpire?: () => void;
  label?: string;
}

export default function CountdownTimer({ initialSeconds = 7140, onExpire, label = "Next Swap in" }: CountdownTimerProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          if (onExpire) onExpire();
          return 7200; // Reset 2-hour cycle
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onExpire]);

  const hrs = Math.floor(secondsRemaining / 3600);
  const mins = Math.floor((secondsRemaining % 3600) / 60);
  const secs = secondsRemaining % 60;
  const timeString = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return (
    <span className="text-gray-400 font-mono text-[11px] bg-[#060913] px-2 py-1 rounded-lg border border-white/10">
      {label} {timeString}
    </span>
  );
}
