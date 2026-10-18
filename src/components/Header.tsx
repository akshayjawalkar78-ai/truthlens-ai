import React from "react";
import { Shield, Sparkles, Database } from "lucide-react";

interface HeaderProps {
  mode: "live" | "demo" | "heuristic";
  hasKeys: boolean;
}

export const Header: React.FC<HeaderProps> = ({ mode, hasKeys }) => {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-xl shadow-sm tracking-tight">
            V
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-xl tracking-tight text-slate-900">Verity</span>
              <span className="text-xs bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-full border border-slate-200">
                Civic Tech
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">Congressional App Challenge Demonstration</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {mode === "demo" && (
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200 shadow-sm">
              <Database className="w-3.5 h-3.5 text-amber-600" />
              <span>Judge-Ready Demo Mode (Offline)</span>
            </div>
          )}

          {mode === "live" && (
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Live AI Analysis Active</span>
            </div>
          )}

          {mode === "heuristic" && (
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 shadow-sm">
              <Shield className="w-3.5 h-3.5 text-slate-500" />
              <span>Local Heuristic Mode</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
