"use client";

import React, { useState } from "react";
import { Header } from "../components/Header";
import { LandingSection } from "../components/LandingSection";
import { ScenarioSelector } from "../components/ScenarioSelector";
import { AnalysisWorkspace } from "../components/AnalysisWorkspace";
import { ResultsDashboard } from "../components/ResultsDashboard";
import { DEMO_SCENARIOS } from "../data/demoScenarios";
import { AnalysisResult } from "../types/analysis";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [selectedDemoId, setSelectedDemoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analysisMode, setAnalysisMode] = useState<"live" | "demo" | "heuristic">("demo");

  // Load a demo scenario
  const handleSelectScenario = (scenarioId: string) => {
    const scenario = DEMO_SCENARIOS.find((s) => s.id === scenarioId);
    if (!scenario) return;

    setSelectedDemoId(scenario.id);
    setInputText(scenario.sampleText);
    setInputUrl(scenario.url || "");
    setValidationError(null);

    // Scroll smoothly to workspace
    const element = document.getElementById("workspace");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLoadRandomDemo = () => {
    const currentIndex = DEMO_SCENARIOS.findIndex((s) => s.id === selectedDemoId);
    const nextIndex = (currentIndex + 1) % DEMO_SCENARIOS.length;
    handleSelectScenario(DEMO_SCENARIOS[nextIndex].id);
  };

  const handleClear = () => {
    setInputText("");
    setInputUrl("");
    setSelectedDemoId(null);
    setValidationError(null);
  };

  const handleReset = () => {
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAnalyze = async () => {
    if (!inputText || inputText.trim().length === 0) {
      setValidationError("Please enter or paste content before running the analysis.");
      return;
    }

    if (inputText.trim().length < 15) {
      setValidationError("Text is too short. Please provide at least a complete headline or sentence.");
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
          url: inputUrl,
          demoId: selectedDemoId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Analysis failed with status ${response.status}`);
      }

      const data = await response.json();
      setResult(data.result);
      if (data.mode === "live") {
        setAnalysisMode("live");
      } else if (data.mode === "demo") {
        setAnalysisMode("demo");
      } else {
        setAnalysisMode("heuristic");
      }

      // Smooth scroll to results
      setTimeout(() => {
        const resultsEl = document.getElementById("results-section");
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (err: any) {
      console.error("Error analyzing content:", err);
      // Fallback: If network request to API fails entirely (e.g. strict offline demo), directly load the demo if selected
      if (selectedDemoId) {
        const scenario = DEMO_SCENARIOS.find((s) => s.id === selectedDemoId);
        if (scenario) {
          setResult(scenario.preAnalyzedResult);
          setAnalysisMode("demo");
          return;
        }
      }
      setValidationError("Analysis request failed. If working offline, please select one of the three pre-analyzed demo scenarios.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header mode={analysisMode} hasKeys={false} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        {!result && (
          <>
            <LandingSection
              onStartAnalyzing={() => {
                const el = document.getElementById("workspace");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              onSelectScenario={handleSelectScenario}
            />

            <ScenarioSelector
              onSelectScenario={handleSelectScenario}
              selectedId={selectedDemoId}
            />
          </>
        )}

        <AnalysisWorkspace
          inputText={inputText}
          setInputText={(text) => {
            setInputText(text);
            // If user alters text, deselect canned demo
            if (selectedDemoId) setSelectedDemoId(null);
          }}
          inputUrl={inputUrl}
          setInputUrl={setInputUrl}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
          onLoadRandomDemo={handleLoadRandomDemo}
          onClear={handleClear}
          validationError={validationError}
        />

        {result && (
          <div id="results-section">
            <ResultsDashboard result={result} onReset={handleReset} />
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Verity • Congressional App Challenge Submission</span>
          <span>Open Source Civic Media Literacy Platform</span>
        </div>
      </footer>
    </div>
  );
}
