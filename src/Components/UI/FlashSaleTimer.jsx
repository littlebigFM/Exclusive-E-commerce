import React, { useState, useEffect } from "react";

// Calculates how much time is left until the target date
const getTimeLeft = (target) => {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

// Pads single digits with a leading zero e.g. 3 → "03"
const pad = (n) => String(n).padStart(2, "0");

const FlashSaleTimer = () => {
  // Set the target date — 3 days from now
  const [target] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    d.setHours(23, 19, 56, 0);
    return d;
  });

  const [timeLeft, setTimeLeft] = useState(getTimeLeft(target));

  // Tick every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div
      className="flex items-end 
    gap-[2px]
    min-[500px]:gap-[4px]
    min-[800px]:gap-[8px]"
    >
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-end gap-[8px]">
          {/* Unit block */}
          <div className="flex flex-col gap-[4px]">
            <span className="text-[12px] font-medium text-black leading-[18px]">
              {unit.label}
            </span>
            <span
              className="
            text-[16px] 
            min-[500px]:text-[24px]
            min-[800px]:text-[32px]
            font-bold text-black leading-[30px] tracking-[0.04em]"
            >
              {pad(unit.value)}
            </span>
          </div>

          {/* Colon separator — not shown after last unit */}
          {i < units.length - 1 && (
            <span
              className="text-[#DB4444] 
            text-[16px] 
            min-[500px]:text-[24px]
            min-[800px]:text-[32px]
            font-bold leading-[30px] pb-[2px]"
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default FlashSaleTimer;
