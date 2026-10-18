import { AnalysisResult, ClaimAssessment, PropagandaTechnique, BiasFraming } from "@/types/analysis";

interface HeuristicRule {
  name: string;
  keywords: RegExp;
  whyItFits: string;
  impactExplanation: string;
}

const PROPAGANDA_RULES: HeuristicRule[] = [
  {
    name: "Emotional Manipulation & Fear Appeals",
    keywords: /\b(catastroph\w+|apocalyp\w+|mortal danger|poisoning our|deadly|terrifying|destroy our|annihilat\w+)\b/i,
    whyItFits: "Appeals directly to intense fear, imminent peril, or existential dread to provoke hasty emotional reactions rather than rational scrutiny.",
    impactExplanation: "Fear impairs critical evaluation and causes readers to circulate alarming assertions before checking for factual substantiation."
  },
  {
    name: "Loaded Language",
    keywords: /\b(corrupt|cronies|ivory towers|incompetent|traitors|evil|puppets|disgraceful|scum|monsters)\b/i,
    whyItFits: "Employs morally charged and derogatory terminology designed to elicit negative judgment before concrete facts are presented.",
    impactExplanation: "Biases the reader against targeted groups or individuals without providing objective evidence of misconduct."
  },
  {
    name: "Scapegoating & Us vs. Them Polarization",
    keywords: /\b(they want you|they are hiding|elites|bureaucrats|outsiders|them vs us|the establishment)\b/i,
    whyItFits: "Constructs a rigid binary between innocent victims and a malicious, conspiratorial opposition.",
    impactExplanation: "Oversimplifies multifaceted societal issues into a dramatic struggle between villains and victims."
  },
  {
    name: "False Dilemma & Urgency Pressure",
    keywords: /\b(either\b.*\bor\b|act now or|before this gets censored|before it's too late|demand immediate|total destruction)\b/i,
    whyItFits: "Artificially constrains options to an extreme binary choice while manufacturing false time pressure.",
    impactExplanation: "Forces the audience into immediate agreement or sharing before independent verification can occur."
  },
  {
    name: "Cherry-Picked Statistics / Missing Context",
    keywords: /\b(spiked by \d+%|skyrocketed|increased by \d+%|plunged by \d+%|astounding \d+%)\b/i,
    whyItFits: "Highlights an isolated dramatic percentage shift without disclosing base numbers, normal variance, or broader multi-year context.",
    impactExplanation: "Misleads readers into inferring an alarming trend from minimal or mathematically skewed baseline data."
  },
  {
    name: "Unsupported Generalization / Absolutes",
    keywords: /\b(every single|everyone knows|nobody wants|always fails|never works|completely crippled|total catastrophe)\b/i,
    whyItFits: "Makes sweeping, absolute declarations that disregard standard exceptions, counter-evidence, and regional nuance.",
    impactExplanation: "Creates false consensus and prevents readers from noticing contradictory evidence."
  },
  {
    name: "Conspiracy Framing",
    keywords: /\b(secret plot|deliberately covering up|cover-up|insiders confirm|what they won't tell you|silenced)\b/i,
    whyItFits: "Presumes hidden malevolent coordination and pre-emptively treats lack of public evidence as proof of a cover-up.",
    impactExplanation: "Insulates claims from factual disproof by dismissing official rebuttals as part of the alleged conspiracy."
  }
];

export function analyzeTextOffline(text: string, url?: string): AnalysisResult {
  const sentences = text
    .split(/(?<=[.?!])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 15);

  const detectedTechniques: PropagandaTechnique[] = [];

  PROPAGANDA_RULES.forEach((rule, idx) => {
    const match = text.match(rule.keywords);
    if (match) {
      // Find matching sentence
      const excerptSentence = sentences.find(s => rule.keywords.test(s)) || match[0];
      detectedTechniques.push({
        id: `tech-detected-${idx + 1}`,
        name: rule.name,
        excerpt: excerptSentence.length > 160 ? excerptSentence.slice(0, 160) + "..." : excerptSentence,
        whyItFits: rule.whyItFits,
        impactExplanation: rule.impactExplanation
      });
    }
  });

  // Extract up to 3-4 key factual claims from sentences
  const claims: ClaimAssessment[] = [];
  const candidateSentences = sentences.slice(0, 4);

  candidateSentences.forEach((sentence, idx) => {
    const hasNumbers = /\d+/.test(sentence);
    const hasLoaded = /\b(catastroph|corrupt|spiked|proven|crisis|danger)\b/i.test(sentence);
    const isOpinion = /\b(should|must|ought|demand|feel|believe|think)\b/i.test(sentence);

    let assessment: AnalysisResult["overallAssessment"] = "Partially Supported";
    let category: ClaimAssessment["category"] = "unverified_claim";

    if (isOpinion) {
      assessment = "Inconclusive";
      category = "opinion";
    } else if (hasLoaded && detectedTechniques.length > 2) {
      assessment = "Unsupported";
      category = "unverified_claim";
    } else if (hasNumbers) {
      assessment = "Misleading or Missing Context";
      category = "verified_fact";
    } else {
      assessment = "Inconclusive";
      category = "unverified_claim";
    }

    claims.push({
      id: `claim-${idx + 1}`,
      claim: sentence,
      assessment: assessment,
      category: category,
      explanation: isOpinion
        ? "This sentence expresses a subjective normative judgment or demand rather than an empirically testable assertion."
        : hasLoaded
        ? "Contains strong emotive language; independent corroborating documentation or official statistics are required to confirm this claim."
        : "Factual claim extracted for verification. Check independent reporting and official primary databases for corroboration.",
      supportingEvidence: [],
      contradictingEvidence: [],
      confidence: "Moderate",
      sources: []
    });
  });

  let overallAssessment: AnalysisResult["overallAssessment"] = "Inconclusive";
  let confidence: AnalysisResult["confidence"] = "Moderate";
  let summaryExplanation = "";

  if (detectedTechniques.length >= 3) {
    overallAssessment = "Misleading or Missing Context";
    confidence = "High";
    summaryExplanation = "The submitted content exhibits multiple persuasive and emotionally charged rhetoric patterns (including loaded phrasing and urgency), which often indicates advocacy or uncorroborated commentary rather than balanced factual reporting.";
  } else if (detectedTechniques.length > 0) {
    overallAssessment = "Partially Supported";
    confidence = "Moderate";
    summaryExplanation = "The content contains some persuasive framing elements. While some statements may have factual basis, readers should seek primary sources to verify the full context.";
  } else {
    overallAssessment = "Supported by Evidence";
    confidence = "Moderate";
    summaryExplanation = "The text adopts a measured tone without overt loaded phrasing or manipulative rhetoric. Cross-referencing against primary records is recommended to confirm specific details.";
  }

  const biasAndFraming: BiasFraming = {
    emotionalTone: detectedTechniques.length > 2 ? "Urgent, emotionally intense, and highly persuasive." : "Relatively measured or conversational.",
    persuasiveStyle: detectedTechniques.length > 2 ? "Strongly Persuasive / Advocacy" : "Informational with some opinion elements",
    emphasizedPerspectives: "Focuses primarily on the author's stated claims without citing balanced counter-evidence or stakeholder context.",
    omittedContext: "Independent audit reports, primary data sources, and opposing expert views are not provided within the submitted text.",
    investigationGuidance: "Search for the primary topic in reputable news outlets, academic research repositories, or government statistical agencies."
  };

  const criticalThinkingQuestions = [
    "What verified, primary documentation or public records would confirm or dispute these claims?",
    "What financial, political, or social motivations might the author have for presenting this perspective?",
    "How does the chosen emotional framing influence how you instinctively feel about the subject before seeing the evidence?"
  ];

  return {
    id: `local-analysis-${Date.now()}`,
    overallAssessment,
    confidence,
    confidenceExplanation: "Assessment generated via local rule-based heuristic parsing of rhetorical patterns, sentence structure, and claim markers.",
    summaryExplanation,
    claims: claims.length > 0 ? claims : [
      {
        id: "claim-single",
        claim: text.length > 120 ? text.slice(0, 120) + "..." : text,
        assessment: overallAssessment,
        category: "unverified_claim",
        explanation: "Primary assertion extracted from user input. Check primary sources for factual backing.",
        confidence: "Moderate",
        sources: []
      }
    ],
    propagandaTechniques: detectedTechniques,
    biasAndFraming,
    criticalThinkingQuestions,
    sources: [],
    isDemo: false,
    disclaimer: "LOCAL HEURISTIC ANALYSIS. Analyzed offline using rhetorical pattern detection. When API keys are configured, Verity employs live language models and web retrieval."
  };
}
