import React from "react";
import { PROPAGANDA_CASE_STUDIES } from "../lib/caseStudies.js";

interface CaseStudiesGridProps {
  onSelectCase: (studyId: string) => void;
  selectedId: string | null;
}

export const CaseStudiesGrid: React.FC<CaseStudiesGridProps> = ({
  onSelectCase,
  selectedId,
}) => {
  return (
    <section id="dossier" className="py-12 border-b border-[#e7e5e4]">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 pb-4 border-b border-[#e7e5e4]">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
            Historical & Contemporary Dossiers
          </h2>
          <p className="text-xs text-[#78716c] mt-1">
            Real-world manipulation campaigns across wartime dispatches, corporate public relations, and electoral agitation.
          </p>
        </div>
        <div className="mt-2 md:mt-0 text-[11px] text-[#78716c]">
          Select any dossier to inspect its tactical anatomy
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROPAGANDA_CASE_STUDIES.map((study: any) => {
          const isSelected = selectedId === study.id;
          return (
            <div
              key={study.id}
              onClick={() => onSelectCase(study.id)}
              className={`cursor-pointer p-6 border transition-all text-left ${
                isSelected
                  ? "border-[#991b1b] bg-white ring-1 ring-[#991b1b]"
                  : "border-[#e7e5e4] bg-white hover:border-[#a8a29e]"
              }`}
            >
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#991b1b]">
                  {study.tag}
                </span>
                <span className="text-[11px] text-[#78716c]">
                  {study.analysis.tactics.length} tactics
                </span>
              </div>

              <h3 className="font-serif text-lg font-bold text-[#1c1917] leading-snug">
                {study.title}
              </h3>

              <p className="text-xs text-[#57534e] mt-2 line-clamp-3 leading-relaxed font-serif italic">
                "{study.sampleText}"
              </p>

              <div className="mt-4 pt-3 border-t border-[#f5f5f4] flex items-center justify-between text-xs">
                <span className="text-[#78716c] truncate max-w-[260px]">
                  {study.sourceContext}
                </span>
                <span className="font-medium text-[#991b1b] hover:underline">
                  {isSelected ? "Active in Inspector ↓" : "Inspect Dossier →"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
