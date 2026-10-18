import React from "react";
import { CheckCircle2, AlertTriangle, Eye, ArrowDown, Info } from "lucide-react";

interface LandingSectionProps {
  onStartAnalyzing: () => void;
  onSelectScenario: (scenarioId: string) => void;
}

export const LandingSection: React.FC<LandingSectionProps> = ({
  onStartAnalyzing,
  onSelectScenario,
}) => {
  return (
    <div className="py-12 md:py-16 text-center max-w-4xl mx-auto px-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-6">
        <span>Congressional App Challenge Project</span>
        <span>•</span>
        <span>Media Literacy & Propaganda Detection</span>
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
        Look beyond the headline.
      </h1>

      <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Verity helps students and everyday citizens evaluate factual claims, identify subtle propaganda techniques, and understand emotional framing—without dictating what opinions to hold.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onStartAnalyzing}
          className="w-full sm:w-auto px-6 py-3.5 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <span>Analyze Content Now</span>
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>

      {/* Feature Highlights */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h2 className="text-base font-semibold text-slate-900">Claim-by-Claim Fact Checking</h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Extracts verifiable factual statements and evaluates evidence support, distinguishing facts from opinions, predictions, and unverified claims.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h2 className="text-base font-semibold text-slate-900">Propaganda Detection</h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Flags rhetorical strategies like fear appeals, loaded language, false dilemmas, scapegoating, and cherry-picked statistics with exact quotes.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4">
            <Eye className="w-5 h-5" />
          </div>
          <h2 className="text-base font-semibold text-slate-900">Bias & Framing Analysis</h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Identifies emotional tone, persuasive intensity, emphasized perspectives, and omitted context—treating bias and factual truth as distinct concepts.
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-3 text-left">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p>
          <span className="font-semibold text-slate-700">Educational Assistant Notice:</span> Verity is an assistive media-literacy tool designed to prompt critical evaluation. AI analysis can make mistakes; a rhetorical flag or partial-support rating does not automatically mean a statement is false. Always cross-check primary sources.
        </p>
      </div>
    </div>
  );
};
