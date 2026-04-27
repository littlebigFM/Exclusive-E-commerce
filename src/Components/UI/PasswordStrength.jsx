import React from "react";
import {
  getStrengthLabel,
  validatePassword,
} from "../../Utils/passwordValidator";
import { Check, X } from "lucide-react";

const PasswordStrength = ({ password }) => {
  if (!password) return null;

  const { rules, strength } = validatePassword(password);
  const { label, color } = getStrengthLabel(strength);

  return (
    <div className="flex flex-col gap-[12px] mt-[8px]">
      {/* Strength bar */}
      <div className="flex flex-col gap-[6px]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-black/50">Password strength</span>
          <span className="text-[12px] font-semibold" style={{ color }}>
            {label}
          </span>
        </div>
        <div className="flex gap-[4px]">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className="flex-1 h-[4px] rounded-full transition-all duration-300"
              style={{
                backgroundColor: level <= strength ? color : "#E5E7EB",
              }}
            />
          ))}
        </div>
      </div>

      {/* Rules checklist */}
      <div className="flex flex-col gap-[6px]">
        {rules.map((rule) => (
          <div key={rule.id} className="flex items-center gap-[8px]">
            <div
              className={`w-[16px] h-[16px] rounded-full flex items-center justify-center shrink-0 transition-colors ${
                rule.passed ? "bg-[#00C853]" : "bg-black/10"
              }`}
            >
              {rule.passed ? (
                <Check size={10} className="text-white" strokeWidth={3} />
              ) : (
                <X size={10} className="text-black/30" strokeWidth={3} />
              )}
            </div>
            <span
              className={`text-[12px] transition-colors ${
                rule.passed ? "text-[#00C853]" : "text-black/40"
              }`}
            >
              {rule.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrength;
