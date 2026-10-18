export type AssessmentType = 
  | "Supported by Evidence"
  | "Partially Supported"
  | "Misleading or Missing Context"
  | "Unsupported"
  | "Inconclusive";

export type ConfidenceLevel = "High" | "Moderate" | "Low";

export type ClaimCategory = "verified_fact" | "opinion" | "prediction" | "unverified_claim";

export interface ClaimAssessment {
  id: string;
  claim: string;
  assessment: AssessmentType;
  category: ClaimCategory;
  explanation: string;
  supportingEvidence?: string[];
  contradictingEvidence?: string[];
  confidence: ConfidenceLevel;
  sources: SourceReference[];
}

export interface PropagandaTechnique {
  id: string;
  name: string;
  excerpt: string;
  whyItFits: string;
  impactExplanation: string;
}

export interface BiasFraming {
  emotionalTone: string;
  persuasiveStyle: string; // e.g. "Strongly Persuasive", "Neutral / Informational", "Heavily Slanted"
  emphasizedPerspectives: string;
  omittedContext: string;
  investigationGuidance: string;
}

export interface SourceReference {
  title: string;
  publisher: string;
  publicationDate?: string;
  url: string;
  relevance: string;
  stance: "supports" | "contradicts" | "contextualizes";
}

export interface AnalysisResult {
  id: string;
  overallAssessment: AssessmentType;
  confidence: ConfidenceLevel;
  confidenceExplanation: string;
  summaryExplanation: string;
  claims: ClaimAssessment[];
  propagandaTechniques: PropagandaTechnique[];
  biasAndFraming: BiasFraming;
  criticalThinkingQuestions: string[];
  sources: SourceReference[];
  isDemo: boolean;
  demoTitle?: string;
  disclaimer: string;
}

export interface DemoScenario {
  id: string;
  title: string;
  category: "Emotional Manipulation" | "Misleading Statistics" | "Evidence-Based Reporting";
  badge: string;
  summary: string;
  sampleText: string;
  url?: string;
  preAnalyzedResult: AnalysisResult;
}
