import React from "react";
import { Loader2, Search, Sparkles, RotateCcw } from "lucide-react";

interface WorkspaceProps {
  inputText: string;
  setInputText: (text: string) => void;
  inputUrl: string;
  setInputUrl: (url: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  onLoadRandomDemo: () => void;
  onClear: () => void;
  validationError: string | null;
}

export const AnalysisWorkspace: React.FC<WorkspaceProps> = ({
  inputText,
  setInputText,
  inputUrl,
  setInputUrl,
  onAnalyze,
  isLoading,
  onLoadRandomDemo,
  onClear,
  validationError,
}) => {
  return (
    <div id="workspace" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Analysis Workspace</h2>
          <p className="text-xs text-slate-500">
            Paste an article excerpt, social media claim, or statement below.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLoadRandomDemo}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center gap-1.5 font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-900" />
            <span>Load Demo Example</span>
          </button>
          {inputText && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors flex items-center gap-1"
              title="Clear input"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={5}
            placeholder="Paste a headline, article, or social media post to analyze..."
            className="w-full p-4 rounded-xl border border-slate-200 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all resize-y"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <input
              type="url"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Source URL (optional, e.g. https://news.org/article-123)"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all"
            />
          </div>
        </div>

        {validationError && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <span>{validationError}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-[11px] text-slate-400 order-2 sm:order-1">
            Tip: Analysis evaluates claims, rhetorical tone, propaganda patterns, and missing context.
          </p>

          <button
            type="button"
            onClick={onAnalyze}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-900 hover:bg-blue-800 disabled:bg-slate-300 text-white font-medium text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 order-1 sm:order-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing Content...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Analyze Content</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
