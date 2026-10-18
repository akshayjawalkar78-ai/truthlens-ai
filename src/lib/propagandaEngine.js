// JavaScript heuristic and pattern evaluation engine for propaganda tactics
// Pure JavaScript module to support mixed JS/TS architecture

const PROPAGANDA_TACTICS = [
  {
    id: "tactic-fear",
    name: "Fear Appeal & Catastrophizing",
    category: "Emotional Coercion",
    regex: /\b(catastroph\w+|apocalyp\w+|mortal danger|deadly threat|annihilat\w+|destroy\w* our|existential crisis|peril|bloodbath)\b/i,
    indicator: "Urgent existential threats designed to bypass critical thinking",
    explanation: "Constructs acute panic and high-stakes survival urgency to force acceptance before evidence is requested.",
    influence: "Induces flight-or-fight response, preconditioning readers to accept radical actions or unvetted accusations."
  },
  {
    id: "tactic-loaded",
    name: "Loaded Language & Vilification",
    category: "Linguistic Bias",
    regex: /\b(corrupt|cronies|regime|traitors|puppets|infesting|thugs|scum|monsters|parasites|evil|incompetent hacks)\b/i,
    indicator: "Pejorative moralizing terms with built-in derogatory judgment",
    explanation: "Replaces neutral descriptions with weaponized characterizations that trigger visceral disgust or anger.",
    influence: "Pre-biases the reader against targeted groups before any factual misconduct is proven."
  },
  {
    id: "tactic-othering",
    name: "Us vs. Them Polarization / Scapegoating",
    category: "Social Division",
    regex: /\b(they want you|they are stealing|our enemies|the outsiders|the real problem is|these people|un-american|infiltrat\w+)\b/i,
    indicator: "Binary grouping defining an in-group as pure and out-group as predatory",
    explanation: "Frames societal frictions as a deliberate assault by an external or subverted out-group.",
    influence: "Channels collective anxiety away from structural causes toward an identifiable scapegoat."
  },
  {
    id: "tactic-false-dilemma",
    name: "Manufactured Binary / False Choice",
    category: "Logical Distortion",
    regex: /\b(either you are with us or|there is only one choice|if we don't act immediately|now or never|surrender or fight)\b/i,
    indicator: "Eliminates intermediate solutions or legitimate alternatives",
    explanation: "Artificial reduction of complex policy trade-offs into an extreme all-or-nothing ultimatum.",
    influence: "Forbids compromise, critical skepticism, and nuanced risk-benefit assessment."
  },
  {
    id: "tactic-cherry-picking",
    name: "Cherry-Picked Data & Baseline Suppression",
    category: "Statistical Manipulation",
    regex: /\b(spiked by \d+%|skyrocketed by \d+%|astounding \d+%|proves conclusively that|all records shattered)\b/i,
    indicator: "Selective high relative percentage without absolute context",
    explanation: "Cites isolated or extreme mathematical spikes while omitting baseline numbers, denominators, and historical norms.",
    influence: "Creates the false illusion of unprecedented collapse or triumph from statistically routine variance."
  },
  {
    id: "tactic-absolutism",
    name: "Absolutism & Sweeping Generalization",
    category: "Linguistic Bias",
    regex: /\b(every single|everyone knows|nobody wants|always fails|never works|total disaster|complete ruin|universally hated)\b/i,
    indicator: "Totalizing adverbs leaving no room for nuance or counterexamples",
    explanation: "Presents isolated complaints or partial failures as universal, uncontested realities.",
    influence: "Stifles counterarguments by creating false uniformity of opinion or outcome."
  },
  {
    id: "tactic-conspiracy",
    name: "Conspiratorial Framing & Hidden Hand",
    category: "Narrative Framing",
    regex: /\b(what the media won't tell you|secret plot|shadowy figures|deliberately orchestrated|masterminds|cover-up|suppressed truth)\b/i,
    indicator: "Presumption of covert coordinated malice explaining everyday events",
    explanation: "Explains standard systemic friction as an intentional secret plot by entrenched power brokers.",
    influence: "Immunizes arguments against counter-evidence by claiming contradictory proof is part of the conspiracy."
  },
  {
    id: "tactic-ad-hominem",
    name: "Ad Hominem Discrediting",
    category: "Argumentative Fallacy",
    regex: /\b(shill|bought and paid for|hack|hypocrite|discredited fool|clueless)\b/i,
    indicator: "Attacking personal credibility to deflect from substantive arguments",
    explanation: "Attacks the speaker's background, motives, or identity instead of addressing the validity of their claims.",
    influence: "Distracts from the empirical evidence by making the presenter the subject of contempt."
  }
];

export function inspectPropagandaTechniques(text) {
  if (!text || typeof text !== "string") return [];

  const sentences = text
    .split(/(?<=[.?!])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 10);

  const matched = [];

  for (const tactic of PROPAGANDA_TACTICS) {
    if (tactic.regex.test(text)) {
      const excerpt = sentences.find(s => tactic.regex.test(s)) || text.slice(0, 140);
      matched.push({
        id: tactic.id,
        name: tactic.name,
        category: tactic.category,
        excerpt: excerpt.length > 180 ? excerpt.slice(0, 180) + "..." : excerpt,
        indicator: tactic.indicator,
        explanation: tactic.explanation,
        influence: tactic.influence
      });
    }
  }

  return matched;
}

export function evaluatePropagandaPosture(text, techniques) {
  const count = techniques.length;

  if (count >= 3) {
    return {
      posture: "High Propaganda Density",
      severity: "high",
      summary: "This text deploys dense layers of manipulative rhetoric, combining emotional coercion with structural distortions to bypass rational scrutiny.",
      rhetoricalSlant: "Heavily Coercive / Agitational Framing",
      primaryDrivers: techniques.map(t => t.name).slice(0, 3).join(", ")
    };
  }

  if (count >= 1) {
    return {
      posture: "Moderate Rhetorical Persuasion",
      severity: "moderate",
      summary: "Identified specific persuasive framing tactics. While parts of the content may describe real events, selective rhetorical framing is actively steering audience sentiment.",
      rhetoricalSlant: "Partisan / Advocacy Rhetoric",
      primaryDrivers: techniques.map(t => t.name).join(", ")
    };
  }

  return {
    posture: "Neutral / Low Propaganda Profile",
    severity: "low",
    summary: "The text relies predominantly on descriptive, institutional, or measured reporting language without overt emotional blackmail, scapegoating, or conspiratorial framing.",
    rhetoricalSlant: "Informational & Measured",
    primaryDrivers: "No significant coercive rhetorical patterns detected"
  };
}
