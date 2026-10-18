"use client";

import React, { useState } from "react";
import { Header } from "../components/Header";
import { CaseStudiesGrid } from "../components/CaseStudiesGrid";
import { PropagandaWorkspace } from "../components/PropagandaWorkspace";
import { ForensicReport } from "../components/ForensicReport";
import { PROPAGANDA_CASE_STUDIES } from "../lib/caseStudies.js";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [sourceContext, setSourceContext] = useState("");
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [reportData, setReportData] = useState<any | null>(null);

  const handleSelectCase = (studyId: string) => {
    const study = PROPAGANDA_CASE_STUDIES.find((s: any) => s.id === studyId);
    if (!study) return;

    setSelectedCaseId(study.id);
    setInputText(study.sampleText);
    setSourceContext(study.sourceContext);
    setValidationError(null);

    // Scroll to workspace
    const el = document.getElementById("inspector");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClear = () => {
    setInputText("");
    setSourceContext("");
    setSelectedCaseId(null);
    setValidationError(null);
  };

  const handleReset = () => {
    setReportData(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAnalyze = async () => {
    if (!inputText || inputText.trim().length === 0) {
      setValidationError("Please enter or paste text to analyze for propaganda techniques.");
      return;
    }

    if (inputText.trim().length < 15) {
      setValidationError("Text is too short. Please provide at least a full sentence or statement.");
      return;
    }

    setValidationError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          sourceContext: sourceContext,
          caseStudyId: selectedCaseId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Analysis failed with status ${response.status}`);
      }

      const payload = await response.json();
      setReportData(payload.result);

      setTimeout(() => {
        const resultsEl = document.getElementById("results");
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (err: any) {
      console.error("Error analyzing propaganda:", err);

      // Offline fallback: If selected case study exists, render its pre-compiled forensic analysis
      if (selectedCaseId) {
        const study = PROPAGANDA_CASE_STUDIES.find((s: any) => s.id === selectedCaseId);
        if (study) {
          setReportData({
            title: study.title,
            tag: study.tag,
            sourceContext: study.sourceContext,
            sourceUrl: study.sourceUrl,
            sampleText: study.sampleText,
            ...study.analysis,
            criticalQuestions: study.analysis.structuralBreakdown.criticalQuestions,
          });
          return;
        }
      }

      setValidationError("Failed to complete propaganda analysis. Please check your text or select a historical case study.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf9]">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
        {/* Editorial Introduction */}
        <div className="pb-8 border-b border-[#e7e5e4] max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#991b1b]">
            Analytical Protocol
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#1c1917] tracking-tight mt-2 leading-[1.15]">
            Forensic analysis of propaganda & coercive rhetoric.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#57534e] leading-relaxed font-serif">
            Truthoganda dissects the psychological machinery of persuasion—identifying fear appeals, loaded vilification, scapegoating, manufactured binaries, and suppressed context in public discourse.
          </p>
        </div>

        {/* Real-World Case Studies */}
        <CaseStudiesGrid
          onSelectCase={handleSelectCase}
          selectedId={selectedCaseId}
        />

        {/* Propaganda Workspace / Text Inspector */}
        <PropagandaWorkspace
          inputText={inputText}
          setInputText={(txt) => {
            setInputText(txt);
            if (selectedCaseId) setSelectedCaseId(null);
          }}
          sourceContext={sourceContext}
          setSourceContext={setSourceContext}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
          onClear={handleClear}
          validationError={validationError}
        />

        {/* Results / Forensic Breakdown */}
        {reportData && (
          <ForensicReport data={reportData} onReset={handleReset} />
        )}
      </main>

      <footer className="border-t border-[#e7e5e4] bg-[#fcfbf9] py-8 text-xs text-[#78716c]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-serif font-bold text-[#1c1917] text-sm">
            Truthoganda
          </div>
          <div>
            Non-partisan forensic rhetoric & propaganda analysis platform
          </div>
          <div>
            Built with Next.js, React & JavaScript
          </div>
        </div>
      </footer>
    </div>
  );
}
