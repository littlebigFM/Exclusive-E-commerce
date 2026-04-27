export const validatePassword = (password) => {
  const rules = [
    {
      id: "length",
      label: "At least 8 characters",
      test: (p) => p.length >= 8,
    },
    {
      id: "uppercase",
      label: "At least one uppercase letter",
      test: (p) => /[A-Z]/.test(p),
    },
    {
      id: "lowercase",
      label: "At least one lowercase letter",
      test: (p) => /[a-z]/.test(p),
    },
    {
      id: "number",
      label: "At least one number",
      test: (p) => /[0-9]/.test(p),
    },
    {
      id: "special",
      label: "At least one special character (!@#$%^&*)",
      test: (p) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p),
    },
  ];

  const results = rules.map((rule) => ({
    ...rule,
    passed: rule.test(password),
  }));

  const isValid = results.every((rule) => rule.passed);
  const strength = results.filter((rule) => rule.passed).length;

  return { rules: results, isValid, strength };
};

// Strength levels based on how many rules pass
export const getStrengthLabel = (strength) => {
  if (strength <= 1) return { label: "Very Weak", color: "#DB4444" };
  if (strength === 2) return { label: "Weak", color: "#FF8C00" };
  if (strength === 3) return { label: "Fair", color: "#FFD700" };
  if (strength === 4) return { label: "Strong", color: "#90EE90" };
  if (strength === 5) return { label: "Very Strong", color: "#00C853" };
  return { label: "", color: "" };
};
