"use client";

import { useMemo, useState } from "react";
import { AppShell } from "../../components/AppShell.jsx";
import { GLOSSARY_TERMS } from "../../data/glossary.js";
import { QUIZ_QUESTIONS } from "../../data/quiz.js";

const inferCategory = (term) => {
  const value = term.toLowerCase();
  if (value.includes("w-2") || value.includes("1099") || value.includes("return") || value.includes("refund")) return "Forms & Returns";
  if (value.includes("fee") || value.includes("withholding") || value.includes("pay") || value.includes("income")) return "Paychecks & Income";
  if (value.includes("credit") || value.includes("deduct") || value.includes("liability") || value.includes("dependent")) return "Tax Basics";
  return "Self-Employment";
};

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("glossary");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedTerms, setExpandedTerms] = useState({});
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const categories = useMemo(
    () => ["All", ...new Set(GLOSSARY_TERMS.map((item) => inferCategory(item.term)))],
    []
  );

  const filteredGlossary = useMemo(() => {
    return GLOSSARY_TERMS.filter((item) => {
      const matchesSearch =
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.whyItMatters.toLowerCase().includes(searchQuery.toLowerCase());
      const category = inferCategory(item.term);
      const matchesCategory = selectedCategory === "All" || category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIdx];

  const handleSelectOption = (idx) => {
    if (showExplanation) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestionIdx]: idx }));
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
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
      if (selectedAnswers[idx] === q.correctIndex) score += 1;
    });
    return score;
  };

  const toggleTerm = (id) => {
    setExpandedTerms((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <AppShell activeTab="learn">
      <div className="space-y-8">
        <div className="rounded-[2rem] border border-[#D9E7DF] bg-[#F7FBF8] p-6 shadow-soft sm:p-8">
          <span className="section-kicker">Education center</span>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.06em] text-[#123C32]">Tax glossary & scenario quiz</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#41514A]">
            Search plain-English explanations for key tax concepts, then test what you know with realistic student scenarios.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-[#D9E7DF] bg-white p-3 shadow-soft">
          <div className="flex flex-col gap-3 border-b border-[#E8EDE7] pb-3 md:flex-row md:items-center">
            <button
              type="button"
              onClick={() => setActiveTab("glossary")}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                activeTab === "glossary" ? "bg-[#123C32] text-white" : "bg-[#F4F8F6] text-[#41514A]"
              }`}
            >
              Glossary ({GLOSSARY_TERMS.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("quiz")}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                activeTab === "quiz" ? "bg-[#123C32] text-white" : "bg-[#F4F8F6] text-[#41514A]"
              }`}
            >
              Quiz ({QUIZ_QUESTIONS.length})
            </button>
          </div>
        </div>

        {activeTab === "glossary" && (
          <div className="space-y-6">
            <div className="rounded-[1.5rem] border border-[#D9E7DF] bg-white p-4 shadow-soft sm:p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for W-2, refund, dependent, withholding…"
                    className="form-input h-12 px-4 text-sm"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] transition ${
                        selectedCategory === category
                          ? "border-[#123C32] bg-[#123C32] text-white"
                          : "border-[#D9E7DF] bg-[#F7FBF8] text-[#41514A]"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredGlossary.map((item) => {
                const isExpanded = !!expandedTerms[item.id];
                const category = inferCategory(item.term);
                return (
                  <article key={item.id} className="panel-surface p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="rounded-full bg-[#EAF7F3] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#176B52]">{category}</span>
                        <h3 className="mt-3 text-xl font-bold text-[#123C32]">{item.term}</h3>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6F7C74]">{item.taxYear}</span>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-[#41514A]">{item.definition}</p>

                    <div className="mt-4 rounded-2xl border border-[#E8EDE7] bg-[#F9FBFA] p-3">
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#176B52]">Why it matters</p>
                      <p className="mt-2 text-sm leading-6 text-[#41514A]">{item.whyItMatters}</p>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 space-y-3 rounded-2xl border border-[#E8EDE7] bg-[#F6FBF8] p-3 text-sm text-[#41514A]">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6F7C74]">Example</p>
                          <p className="mt-1 leading-6">{item.example}</p>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#E8EDE7] pt-4">
                      <button type="button" onClick={() => toggleTerm(item.id)} className="text-sm font-semibold text-[#176B52]">
                        {isExpanded ? "Hide example" : "View example"}
                      </button>
                      <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="text-xs font-semibold text-[#123C32] hover:underline">
                        Official source ↗
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>

            {filteredGlossary.length === 0 && (
              <div className="rounded-[1.5rem] border border-dashed border-[#BBD9CD] bg-[#F4FAF7] p-10 text-center text-[#41514A]">
                No glossary terms match your search yet. Try a broader term like “W-2,” “refund,” or “dependent.”
              </div>
            )}
          </div>
        )}

        {activeTab === "quiz" && (
          <div className="rounded-[1.5rem] border border-[#D9E7DF] bg-white p-6 shadow-soft sm:p-8">
            {!quizFinished ? (
              <div className="space-y-6">
                <div className="flex flex-col gap-3 border-b border-[#E8EDE7] pb-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6F7C74]">
                    Question {currentQuestionIdx + 1} of {QUIZ_QUESTIONS.length}
                  </span>
                  <span className="rounded-full bg-[#EAF7F3] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#176B52]">
                    Scenario: {currentQ.scenario}
                  </span>
                </div>

                <h3 className="text-2xl font-black tracking-[-0.04em] text-[#123C32]">{currentQ.question}</h3>

                <div className="space-y-3">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedAnswers[currentQuestionIdx] === idx;
                    const isCorrect = currentQ.correctIndex === idx;

                    let classes = "border-[#E8EDE7] bg-[#F9FBFA] text-[#202923] hover:border-[#BBD9CD]";
                    if (showExplanation) {
                      if (isCorrect) classes = "border-[#8CC1A3] bg-[#EAF7F3] text-[#123C32]";
                      else if (isSelected) classes = "border-[#E9B8B8] bg-[#FDF1F1] text-[#5E2A2A]";
                      else classes = "border-[#EFF2F0] bg-white text-[#9AA9A3]";
                    } else if (isSelected) {
                      classes = "border-[#123C32] bg-[#ECF4F1] text-[#123C32]";
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectOption(idx)}
                        disabled={showExplanation}
                        className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left text-base transition ${classes}`}
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-[#123C32]">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="leading-7">{option}</span>
                      </button>
                    );
                  })}
                </div>

                {showExplanation && (
                  <div className="rounded-[1.5rem] border border-[#D9E7DF] bg-[#F6FBF8] p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#176B52]">Why this answer works</p>
                    <p className="mt-3 text-base leading-7 text-[#41514A]">{currentQ.explanation}</p>
                    <a href={currentQ.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold text-[#123C32] hover:underline">
                      {currentQ.sourceTitle} ↗
                    </a>
                  </div>
                )}

                {showExplanation && (
                  <div className="flex justify-end">
                    <button type="button" onClick={handleNextQuestion} className="primary-btn h-12 px-5 text-sm">
                      {currentQuestionIdx + 1 < QUIZ_QUESTIONS.length ? "Next question" : "View results"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6F7C74]">Quiz complete</p>
                <h3 className="mt-4 text-4xl font-black tracking-[-0.06em] text-[#123C32]">
                  {calculateScore()} / {QUIZ_QUESTIONS.length}
                </h3>
                <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#41514A]">
                  Great effort. A few tax ideas are tricky at first, and the goal here is confidence, not perfection.
                </p>
                <button type="button" onClick={handleRestartQuiz} className="primary-btn mt-6 h-11 px-5 text-sm">
                  Retake quiz
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}
