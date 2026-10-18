// Pure JavaScript module for formatting, categorization, and DOM exports
export function formatTacticSeverity(severity) {
  switch (severity) {
    case "high":
      return {
        badgeClass: "bg-amber-900/10 text-amber-950 border border-amber-900/20",
        label: "Severe Distortion"
      };
    case "moderate":
      return {
        badgeClass: "bg-stone-200 text-stone-800 border border-stone-300",
        label: "Notable Persuasive Slant"
      };
    case "low":
    default:
      return {
        badgeClass: "bg-emerald-950/10 text-emerald-900 border border-emerald-900/20",
        label: "Minimal Propaganda"
      };
  }
}

export function generateCriticalChecklist(tactics) {
  const baseQuestions = [
    "What verified, primary documentation or public records would confirm or dispute these claims?",
    "What financial, political, or social motivations might the author have for presenting this perspective?",
    "How does the chosen emotional framing influence how you instinctively feel about the subject before seeing the evidence?"
  ];

  if (tactics.some(t => t.id === "tactic-cherry-picking")) {
    baseQuestions.push("What is the underlying baseline number or absolute denominator behind the cited percentage?");
  }
  if (tactics.some(t => t.id === "tactic-othering")) {
    baseQuestions.push("Is a specific demographic or political group being portrayed as uniformly malicious or subhuman?");
  }
  if (tactics.some(t => t.id === "tactic-fear")) {
    baseQuestions.push("Is acute fear or an existential deadline being leveraged to force compliance before investigation?");
  }

  return baseQuestions.slice(0, 4);
}
