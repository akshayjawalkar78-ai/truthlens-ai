"use client";

import { useState } from "react";
import { AppShell } from "../components/AppShell.jsx";
import { GLOSSARY_TERMS } from "../data/glossary.js";
import { QUIZ_QUESTIONS } from "../data/quiz.js";

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("glossary"); // "glossary" or "quiz"
  const [searchQuery, setSearchQuery] = useState("");
  
  // Quiz state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const filteredGlossary = GLOSSARY_TERMS.filter(item => 
    item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentQ = QUIZ_QUESTIONS[currentQuestionIdx];

  const handleSelectOption = (idx) => {
    if (showExplanation) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIdx]: idx
    }));
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizFinished(false);
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  return (
    <AppShell activeTab="learn">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Education Center
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
            Tax Glossary & Scenario Quiz
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Search plain-English definitions for essential tax concepts, or test your skills on real-world situations with our student tax quiz.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab("glossary")}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === "glossary"
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Searchable Tax Glossary ({GLOSSARY_TERMS.length} Terms)
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === "quiz"
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Tax Scenario Quiz ({QUIZ_QUESTIONS.length} Questions)
          </button>
        </div>

        {/* Tab A: Searchable Glossary */}
        {activeTab === "glossary" && (
          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search glossary terms (e.g. W-2, dependent, withholding, refund)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-slate-900 shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGlossary.map((item) => (
                <div key={item.id} className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm space-y-2">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-bold text-slate-900">{item.term}</h3>
                    <span className="text-[10px] text-slate-500 font-mono">{item.taxYear}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {item.definition}
                  </p>
                  <div className="pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <strong className="text-slate-800">Why it matters:</strong> {item.whyItMatters}
                  </div>
                  {item.example && (
                    <div className="text-[11px] text-slate-500 italic">
                      <strong>Example:</strong> {item.example}
                    </div>
                  )}
                  <div className="pt-2">
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-blue-900 hover:underline"
                    >
                      {item.sourceTitle} ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab B: Interactive Quiz */}
        {activeTab === "quiz" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            {!quizFinished ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Question {currentQuestionIdx + 1} of {QUIZ_QUESTIONS.length}
                  </span>
                  <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-0.5 rounded">
                    Scenario: {currentQ.scenario}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {currentQ.question}
                </h3>

                <div className="space-y-3">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedAnswers[currentQuestionIdx] === idx;
                    const isCorrect = currentQ.correctIndex === idx;

                    let btnStyle = "bg-white border-slate-200 hover:border-slate-300 text-slate-800";
                    if (showExplanation) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-medium";
                      } else if (isSelected) {
                        btnStyle = "bg-rose-50 border-rose-500 text-rose-950";
                      } else {
                        btnStyle = "bg-white border-slate-100 text-slate-400 opacity-60";
                      }
                    } else if (isSelected) {
                      btnStyle = "bg-slate-100 border-slate-900 text-slate-900";
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectOption(idx)}
                        disabled={showExplanation}
                        className={`w-full p-4 rounded-xl border text-left text-xs transition-all flex items-start gap-3 ${btnStyle}`}
                      >
                        <span className="font-bold shrink-0">{String.fromCharCode(65 + idx)}.</span>
                        <span className="leading-relaxed">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {showExplanation && (
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 animate-fadeIn text-xs">
                    <span className="font-bold text-slate-900">Official Educational Explanation:</span>
                    <p className="text-slate-700 leading-relaxed">{currentQ.explanation}</p>
                    <div className="pt-2">
                      <a
                        href={currentQ.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-semibold text-blue-900 hover:underline"
                      >
                        Source: {currentQ.sourceTitle} ↗
                      </a>
                    </div>
                  </div>
                )}

                {showExplanation && (
                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      {currentQuestionIdx + 1 < QUIZ_QUESTIONS.length ? "Next Question →" : "View Quiz Results →"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Quiz Completed</span>
                <h3 className="text-3xl font-extrabold text-slate-900">
                  You scored {calculateScore()} out of {QUIZ_QUESTIONS.length}!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Great job practicing real-world tax scenarios. You now understand how dependent filing works, why gig work incurs self-employment taxes, and why tax refunds are simply returned prepayments.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={handleRestartQuiz}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}
