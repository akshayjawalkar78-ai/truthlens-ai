import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="border-b border-[#e7e5e4] bg-[#fcfbf9]">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-baseline space-x-3">
          <span className="font-serif text-2xl font-extrabold tracking-tight text-[#991b1b]">
            Truthoganda
          </span>
          <span className="text-xs text-[#78716c] font-medium border-l border-[#e7e5e4] pl-3">
            Propaganda & Rhetorical Manipulation Engine
          </span>
        </div>

        <nav className="flex items-center space-x-6 text-xs font-medium text-[#78716c]">
          <a href="#dossier" className="hover:text-[#1c1917] transition-colors">
            Case Studies
          </a>
          <a href="#inspector" className="hover:text-[#1c1917] transition-colors">
            Analyze Text
          </a>
          <span className="text-[#a8a29e]">|</span>
          <span className="text-[#991b1b] font-semibold">
            Forensic Rhetoric
          </span>
        </nav>
      </div>
    </header>
  );
};
