import React from "react";

interface WorkspaceProps {
  inputText: string;
  setInputText: (text: string) => void;
  sourceContext: string;
  setSourceContext: (src: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  onClear: () => void;
  validationError: string | null;
}

export const PropagandaWorkspace: React.FC<WorkspaceProps> = ({
  inputText,
  setInputText,
  sourceContext,
  setSourceContext,
  onAnalyze,
  isLoading,
  onClear,
  validationError,
}) => {
  return (
    <section id="inspector" className="py-12 border-b border-[#e7e5e4]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Context & Editorial Direction */}
        <div className="lg:col-span-4 space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#991b1b]">
            Propaganda Inspector
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#1c1917] leading-tight">
            Deconstruct Persuasive & Coercive Rhetoric
          </h2>
          <p className="text-xs text-[#57534e] leading-relaxed">
            Submit speeches, partisan campaign flyers, press statements, or online commentary to map emotional appeals, loaded vilification, manufactured binaries, and omitted context.
          </p>

          <div className="pt-4 border-t border-[#e7e5e4] space-y-2 text-[11px] text-[#78716c]">
            <div>
              <strong className="text-[#1c1917]">Technique Catalog:</strong> Fear appeals, loaded words, us-vs-them polarization, cherry-picked baselines, conspiratorial framing, and ad hominem deflections.
            </div>
            <div>
              <strong className="text-[#1c1917]">Non-Partisan Mandate:</strong> Rhetorical scrutiny is applied identically regardless of political alignment or institutional pedigree.
            </div>
          </div>
        </div>

        {/* Right Column: Text Entry Form */}
        <div className="lg:col-span-8 bg-white border border-[#e7e5e4] p-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="propaganda-text-input" className="text-xs font-semibold text-[#1c1917]">
                Text for Propaganda Inspection
              </label>
              {inputText && (
                <button
                  type="button"
                  onClick={onClear}
                  className="text-[11px] text-[#78716c] hover:text-[#991b1b] underline"
                >
                  Clear Text
                </button>
              )}
            </div>
            <textarea
              id="propaganda-text-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={7}
              placeholder="Paste speech excerpt, editorial, advertisement, or political statement here..."
              className="w-full p-3.5 bg-[#fafaf9] border border-[#d6d3d1] text-xs text-[#1c1917] leading-relaxed resize-y font-mono"
            />
          </div>

          <div>
            <label htmlFor="source-context-input" className="block text-[11px] font-semibold text-[#57534e] mb-1">
              Source Attribution or Speaker Context (Optional)
            </label>
            <input
              id="source-context-input"
              type="text"
              value={sourceContext}
              onChange={(e) => setSourceContext(e.target.value)}
              placeholder="e.g., Campaign mailer, Foreign ministry dispatch, Television advertisement"
              className="w-full p-2.5 bg-[#fafaf9] border border-[#d6d3d1] text-xs text-[#1c1917]"
            />
          </div>

          {validationError && (
            <div className="p-3 bg-[#fef2f2] border border-[#fecaca] text-xs text-[#991b1b]">
              {validationError}
            </div>
          )}

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-[#78716c]">
              Minimum 15 characters required
            </span>

            <button
              type="button"
              onClick={onAnalyze}
              disabled={isLoading}
              className="px-6 py-2.5 bg-[#991b1b] hover:bg-[#7f1d1d] disabled:bg-[#d6d3d1] text-white text-xs font-semibold tracking-wide transition-colors"
            >
              {isLoading ? "Deconstructing Rhetoric..." : "Inspect for Propaganda"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
