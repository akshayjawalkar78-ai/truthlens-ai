import React from "react";
import { formatTacticSeverity } from "../lib/analysisUtils.js";

interface ReportProps {
  data: any;
  onReset: () => void;
}

export const ForensicReport: React.FC<ReportProps> = ({ data, onReset }) => {
  const severityBadge = formatTacticSeverity(data.severity);

  return (
    <section id="results" className="py-12 space-y-12 animate-fadeIn">
      {/* 1. Header & Posture Overview */}
      <div className="border-b border-[#1c1917] pb-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#991b1b]">
              Forensic Report
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider ${severityBadge.badgeClass}`}>
              {data.posture}
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#1c1917]">
            {data.title || "Propaganda Anatomy Assessment"}
          </h2>
          <p className="text-xs text-[#78716c] mt-1">
            Context: {data.sourceContext || "Direct submission"} • Rhetorical Slant: <strong className="text-[#1c1917]">{data.rhetoricalSlant}</strong>
          </p>
        </div>

        <button
          onClick={onReset}
          className="self-start md:self-auto px-4 py-2 border border-[#d6d3d1] hover:border-[#1c1917] bg-white text-xs text-[#1c1917] font-medium transition-colors"
        >
          ← Inspect Another Text
        </button>
      </div>

      {/* Summary Narrative */}
      <div className="p-6 bg-white border border-[#e7e5e4] border-l-4 border-l-[#991b1b]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#57534e] mb-2">
          Executive Rhetorical Summary
        </h3>
        <p className="font-serif text-base text-[#1c1917] leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* 2. Detected Propaganda Tactics Table */}
      <div>
        <div className="flex items-baseline justify-between mb-4 pb-2 border-b border-[#e7e5e4]">
          <h3 className="font-serif text-xl font-bold text-[#1c1917]">
            Identified Manipulation Tactics ({data.tactics ? data.tactics.length : 0})
          </h3>
          <span className="text-xs text-[#78716c]">
            Excerpts mapped to psychological levers
          </span>
        </div>

        {!data.tactics || data.tactics.length === 0 ? (
          <div className="p-8 bg-white border border-[#e7e5e4] text-center">
            <p className="font-serif text-lg font-semibold text-[#1c1917]">
              No Manipulative Propaganda Techniques Detected
            </p>
            <p className="text-xs text-[#78716c] mt-1 max-w-lg mx-auto">
              The submitted content uses measured, descriptive, or informational syntax without overt emotional blackmail, scapegoating, or manufactured binaries.
            </p>
          </div>
        ) : (
          <div className="border border-[#e7e5e4] bg-white divide-y divide-[#e7e5e4]">
            {data.tactics.map((tactic: any, idx: number) => (
              <div key={tactic.id || idx} className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Tactic Name & Category */}
                <div className="md:col-span-3 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#991b1b]">
                    Tactic #{idx + 1}
                  </span>
                  <h4 className="font-serif text-base font-bold text-[#1c1917] leading-tight">
                    {tactic.name}
                  </h4>
                  <div className="text-[11px] text-[#78716c]">
                    Category: {tactic.category}
                  </div>
                </div>

                {/* Specific Excerpt Quote */}
                <div className="md:col-span-4 bg-[#fafaf9] p-3 border border-[#e7e5e4] font-serif text-xs italic text-[#1c1917] leading-relaxed">
                  "{tactic.excerpt}"
                </div>

                {/* Anatomical Explanation & Audience Impact */}
                <div className="md:col-span-5 space-y-2 text-xs text-[#44403c] leading-relaxed">
                  <div>
                    <strong className="text-[#1c1917]">Why it functions as propaganda: </strong>
                    {tactic.explanation}
                  </div>
                  <div>
                    <strong className="text-[#1c1917]">Psychological influence on reader: </strong>
                    {tactic.influence}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Structural Breakdown & Omitted Realities */}
      {data.structuralBreakdown && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="p-6 bg-white border border-[#e7e5e4] space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#991b1b]">
              Persuasive Architecture
            </span>
            <h4 className="font-serif text-lg font-bold text-[#1c1917]">
              Targeted Psychological Levers
            </h4>
            <p className="text-xs text-[#57534e] leading-relaxed">
              {data.structuralBreakdown.psychologicalLeverage}
            </p>
          </div>

          <div className="p-6 bg-white border border-[#e7e5e4] space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#991b1b]">
              Contextual Blindspots
            </span>
            <h4 className="font-serif text-lg font-bold text-[#1c1917]">
              Omitted Facts & Counter-Evidence
            </h4>
            <p className="text-xs text-[#57534e] leading-relaxed">
              {data.structuralBreakdown.omittedFacts}
            </p>
          </div>
        </div>
      )}

      {/* 4. Cross-Examination Questions (Think Critically) */}
      <div className="p-8 bg-[#1c1917] text-[#fcfbf9] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#44403c] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#f87171]">
              Inquiry Protocol
            </span>
            <h3 className="font-serif text-xl font-bold text-white mt-1">
              Cross-Examining the Narrative
            </h3>
          </div>
          <span className="text-xs text-[#a8a29e]">
            Essential questions before accepting the author's framing
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(data.criticalQuestions || []).map((q: string, i: number) => (
            <div key={i} className="space-y-2 border-l border-[#7f1d1d] pl-4">
              <span className="font-mono text-xs text-[#f87171]">0{i + 1}</span>
              <p className="font-serif text-xs text-[#e7e5e4] leading-relaxed">
                {q}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[#44403c] flex items-center justify-between text-xs text-[#a8a29e]">
          <span>Truthoganda • Propaganda & Rhetorical Manipulation Engine</span>
          <button
            onClick={onReset}
            className="text-white hover:text-[#f87171] font-semibold underline"
          >
            Inspect New Submission
          </button>
        </div>
      </div>
    </section>
  );
};
