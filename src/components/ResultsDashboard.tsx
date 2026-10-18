import React from "react";
import { 
  CheckCircle, 
  AlertCircle, 
  AlertTriangle, 
  HelpCircle, 
  ExternalLink,
  ShieldAlert,
  Sliders,
  Compass,
  RotateCcw,
  BookOpen,
  Info
} from "lucide-react";
import { AnalysisResult, AssessmentType, ConfidenceLevel } from "@/types/analysis";

interface ResultsDashboardProps {
  result: AnalysisResult;
  onReset: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result, onReset }) => {
  const getAssessmentBadge = (assessment: AssessmentType) => {
    switch (assessment) {
      case "Supported by Evidence":
        return {
          bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          icon: <CheckCircle className="w-4 h-4 text-emerald-600" />,
        };
      case "Partially Supported":
        return {
          bg: "bg-blue-50 text-blue-800 border-blue-200",
          icon: <AlertCircle className="w-4 h-4 text-blue-600" />,
        };
      case "Misleading or Missing Context":
        return {
          bg: "bg-amber-50 text-amber-800 border-amber-200",
          icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
        };
      case "Unsupported":
        return {
          bg: "bg-rose-50 text-rose-800 border-rose-200",
          icon: <AlertCircle className="w-4 h-4 text-rose-600" />,
        };
      case "Inconclusive":
      default:
        return {
          bg: "bg-slate-100 text-slate-800 border-slate-200",
          icon: <HelpCircle className="w-4 h-4 text-slate-500" />,
        };
    }
  };

  const getConfidenceBadge = (confidence: ConfidenceLevel) => {
    switch (confidence) {
      case "High":
        return "bg-emerald-100 text-emerald-800";
      case "Moderate":
        return "bg-amber-100 text-amber-800";
      case "Low":
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const overallBadge = getAssessmentBadge(result.overallAssessment);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Demo / Live Status Banner */}
      {result.isDemo ? (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start justify-between gap-3 text-amber-900">
          <div className="flex items-start gap-2.5">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold tracking-wide uppercase text-amber-800">
                {result.demoTitle || "Demonstration Scenario — Sample Pre-Analyzed Result"}
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                {result.disclaimer}
              </p>
            </div>
          </div>
          <span className="text-[10px] bg-amber-200/60 font-semibold px-2 py-0.5 rounded border border-amber-300 shrink-0">
            OFFLINE DEMO
          </span>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-start justify-between gap-3 text-blue-900">
          <div className="flex items-start gap-2.5">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold tracking-wide uppercase text-blue-800">
                Analysis Generated for Submitted Text
              </p>
              <p className="text-xs text-blue-700 mt-0.5">
                {result.disclaimer}
              </p>
            </div>
          </div>
          <span className="text-[10px] bg-blue-200/60 font-semibold px-2 py-0.5 rounded border border-blue-300 shrink-0">
            EVALUATION
          </span>
        </div>
      )}

      {/* 1. Overall Assessment Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Overall Evidence Assessment
            </span>
            <div className="flex items-center gap-3 mt-2">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-sm font-semibold ${overallBadge.bg}`}>
                {overallBadge.icon}
                <span>{result.overallAssessment}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="text-slate-400">•</span>
                <span>Confidence:</span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${getConfidenceBadge(result.confidence)}`}>
                  {result.confidence}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onReset}
            className="self-start md:self-auto text-xs px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Analyze Another Piece</span>
          </button>
        </div>

        <div className="mt-6 space-y-3">
          <p className="text-sm text-slate-800 leading-relaxed font-normal">
            {result.summaryExplanation}
          </p>
          <p className="text-xs text-slate-500 italic">
            Confidence notice: {result.confidenceExplanation} Confidence measures available analytical corroboration, not absolute mathematical truth.
          </p>
        </div>
      </div>

      {/* 2. Claim-by-Claim Fact Checking */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Claim-by-Claim Fact Checking</h2>
              <p className="text-xs text-slate-500">
                Isolated factual assertions, category distinction, and available evidentiary support.
              </p>
            </div>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {result.claims.length} {result.claims.length === 1 ? "Claim" : "Claims"} Evaluated
          </span>
        </div>

        <div className="space-y-4">
          {result.claims.map((claim, idx) => {
            const badge = getAssessmentBadge(claim.assessment);
            return (
              <div key={claim.id || idx} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-bold text-slate-400 mt-0.5">#{idx + 1}</span>
                    <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                      "{claim.claim}"
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium ${badge.bg}`}>
                      {badge.icon}
                      <span>{claim.assessment}</span>
                    </span>
                    <span className="text-[11px] font-medium bg-slate-200 text-slate-700 px-2 py-0.5 rounded capitalize">
                      {claim.category.replace("_", " ")}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 mt-2 leading-relaxed pl-5">
                  {claim.explanation}
                </p>

                {/* Evidence bullets if present */}
                {(claim.supportingEvidence && claim.supportingEvidence.length > 0) ||
                (claim.contradictingEvidence && claim.contradictingEvidence.length > 0) ? (
                  <div className="mt-3 pl-5 grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-200/60 text-xs">
                    {claim.supportingEvidence && claim.supportingEvidence.length > 0 && (
                      <div className="space-y-1">
                        <span className="font-semibold text-emerald-800 text-[11px]">Supporting Evidence:</span>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          {claim.supportingEvidence.map((ev, i) => (
                            <li key={i}>{ev}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {claim.contradictingEvidence && claim.contradictingEvidence.length > 0 && (
                      <div className="space-y-1">
                        <span className="font-semibold text-rose-800 text-[11px]">Contradicting Evidence:</span>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          {claim.contradictingEvidence.map((ev, i) => (
                            <li key={i}>{ev}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="mt-2 pl-5 text-[11px] text-slate-400 italic">
                    External evidence check: Direct live database corroboration not active or unavailable for this claim.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Propaganda Technique Detection */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-900 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Propaganda & Rhetorical Techniques</h2>
              <p className="text-xs text-slate-500">
                Persuasive strategies, emotional appeals, and psychological framing identified in text.
              </p>
            </div>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {result.propagandaTechniques.length} {result.propagandaTechniques.length === 1 ? "Technique" : "Techniques"} Flagged
          </span>
        </div>

        {result.propagandaTechniques.length === 0 ? (
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-600">
            <p className="font-medium text-slate-800">No Manipulative Propaganda Techniques Detected</p>
            <p className="mt-1 text-slate-500">
              The submitted content uses measured, descriptive, or informational rhetoric without overt emotional manipulation or deceptive framing.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.propagandaTechniques.map((tech, idx) => (
              <div key={tech.id || idx} className="p-5 rounded-xl border border-amber-200 bg-amber-50/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                    <h3 className="text-xs font-bold text-amber-900 tracking-tight">{tech.name}</h3>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-amber-200/70 text-xs text-slate-800 italic mb-3">
                    "{tech.excerpt}"
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-semibold text-slate-700">Why it fits: </span>
                      <span className="text-slate-600">{tech.whyItFits}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">Audience impact: </span>
                      <span className="text-slate-600">{tech.impactExplanation}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Bias and Framing Analysis */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-900 flex items-center justify-center font-bold text-sm">
            3
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">Bias and Framing Analysis</h2>
            <p className="text-xs text-slate-500">
              Examining tone, slant, emphasized viewpoints, and omitted context without judging opinions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-blue-900" />
              Emotional Tone & Persuasive Style
            </span>
            <p className="text-slate-800 font-medium">{result.biasAndFraming.emotionalTone}</p>
            <p className="text-slate-600 text-[11px]">{result.biasAndFraming.persuasiveStyle}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-900" />
              Emphasized Perspectives
            </span>
            <p className="text-slate-600">{result.biasAndFraming.emphasizedPerspectives}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-semibold text-slate-700">Omitted Context or Missing Perspectives</span>
            <p className="text-slate-600">{result.biasAndFraming.omittedContext}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-semibold text-slate-700">Investigation Guidance</span>
            <p className="text-slate-600">{result.biasAndFraming.investigationGuidance}</p>
          </div>
        </div>
      </div>

      {/* 5. Sources and Further Reading */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-900 flex items-center justify-center font-bold text-sm">
              4
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Sources and Reference Evidence</h2>
              <p className="text-xs text-slate-500">
                Official documents, primary records, and independent reference materials.
              </p>
            </div>
          </div>
        </div>

        {result.sources.length === 0 ? (
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <p className="font-medium text-slate-800">No External Sources Retrieved</p>
            <p className="mt-1 text-slate-500">
              Live web search API was not configured or offline. In accordance with Verity's ethics rules, zero fabricated citations or simulated search results are shown.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {result.sources.map((src, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 text-sm hover:underline">
                      <a href={src.url} target="_blank" rel="noopener noreferrer">
                        {src.title}
                      </a>
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded capitalize ${
                      src.stance === "supports" 
                        ? "bg-emerald-100 text-emerald-800" 
                        : src.stance === "contradicts" 
                        ? "bg-rose-100 text-rose-800" 
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {src.stance}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-500 mt-1">
                    <span>{src.publisher}</span>
                    {src.publicationDate && (
                      <>
                        <span>•</span>
                        <span>{src.publicationDate}</span>
                      </>
                    )}
                  </div>

                  <p className="text-slate-600 mt-1.5 text-xs">
                    {src.relevance}
                  </p>
                </div>

                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium shrink-0 text-xs"
                >
                  <span>View Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. Think Critically Section */}
      <div className="bg-slate-900 text-white rounded-2xl shadow-sm p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-bold tracking-tight">Think Critically</h2>
        </div>
        <p className="text-xs text-slate-300 mb-6">
          Before sharing or forming an opinion, ask yourself these essential questions tailored to this content:
        </p>

        <div className="space-y-3">
          {result.criticalThinkingQuestions.map((q, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-start gap-3 text-xs leading-relaxed">
              <span className="font-bold text-blue-400 mt-0.5">Q{idx + 1}.</span>
              <span className="text-slate-200">{q}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 text-center sm:text-left">
            Verity empowers users to question framing, verify data, and build lifelong digital discernment.
          </p>

          <button
            onClick={onReset}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-800" />
            <span>Analyze Another Piece</span>
          </button>
        </div>
      </div>
    </div>
  );
};
