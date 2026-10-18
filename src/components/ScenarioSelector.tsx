import { DEMO_SCENARIOS } from "../data/demoScenarios";
import { Sparkles, ArrowRight, BookOpen } from "lucide-react";

interface ScenarioSelectorProps {
  onSelectScenario: (scenarioId: string) => void;
  selectedId: string | null;
}

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({
  onSelectScenario,
  selectedId,
}) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-900" />
          <h2 className="text-sm font-semibold text-slate-800">Judge-Ready Demonstration Scenarios</h2>
        </div>
        <span className="text-xs bg-blue-100 text-blue-800 font-medium px-2 py-0.5 rounded-full">
          Works 100% Offline
        </span>
      </div>
      <p className="text-xs text-slate-600 mb-4">
        Click any verified scenario below to populate the workspace with realistic, pre-analyzed examples for your presentation:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {DEMO_SCENARIOS.map((scenario) => {
          const isSelected = selectedId === scenario.id;
          return (
            <button
              key={scenario.id}
              onClick={() => onSelectScenario(scenario.id)}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? "bg-white border-blue-900 shadow-sm ring-2 ring-blue-900/10"
                  : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-semibold text-blue-900 truncate">
                    {scenario.category}
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                    {scenario.badge}
                  </span>
                </div>
                <h3 className="text-xs font-medium text-slate-900 line-clamp-1">{scenario.title}</h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {scenario.summary}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-blue-900 pt-2 border-t border-slate-100">
                <span>{isSelected ? "Currently Selected" : "Load Scenario"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
