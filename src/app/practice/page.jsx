"use client";

import { useEffect, useState } from "react";
import { AppShell } from "../../components/AppShell.jsx";
import { gradeQuiz } from "../../lib/quiz.js";

const MOCK_RETURN_QUESTIONS = [
  {
    id: "mock-wages",
    scenario: "Fictional W-2",
    question: "Maya's fictional W-2 lists $3,250 in Box 1. Which number belongs in the wage section of this practice return?",
    options: ["$3,250 from Box 1", "$195 from Box 2", "$201.50 from Box 4"],
    correctIndex: 0,
    explanation: "Box 1 reports wages, tips, and other compensation. Box 2 is federal income tax withheld, while Box 4 is Social Security tax withheld.",
    sourceTitle: "About Form W-2",
    sourceUrl: "https://www.irs.gov/forms-pubs/about-form-w-2",
  },
  {
    id: "mock-withholding",
    scenario: "Fictional W-2",
    question: "The same sample W-2 shows $195 in Box 2. What does this amount represent?",
    options: ["Federal income tax withheld during the year", "Total wages before tax", "Social Security wages"],
    correctIndex: 0,
    explanation: "Box 2 totals federal income tax that the employer withheld from paychecks and sent in during the year. It is a prepayment, not the final tax calculation.",
    sourceTitle: "About Form W-2",
    sourceUrl: "https://www.irs.gov/forms-pubs/about-form-w-2",
  },
  {
    id: "mock-dependent",
    scenario: "Filing basics",
    question: "If Maya's parent can claim her as a dependent, what should she do in this practice return?",
    options: ["Indicate that someone can claim her as a dependent", "Assume she cannot file a return", "Use her parent's wages instead"],
    correctIndex: 0,
    explanation: "Dependent status does not by itself decide whether someone files. A return should accurately indicate whether another taxpayer can claim the filer; current filing rules depend on the person's full situation.",
    sourceTitle: "IRS Publication 501",
    sourceUrl: "https://www.irs.gov/publications/p501",
  },
  {
    id: "mock-refund-math",
    scenario: "Practice math only",
    question: "For this arithmetic exercise only, assume a fictional $0 income-tax liability and $195 withheld. What is the difference?",
    options: ["$195 in this simplified example", "$0 is always the result for a dependent", "$201.50 because Social Security is the same as income tax"],
    correctIndex: 0,
    explanation: "The subtraction is $195 minus $0. This is only a made-up arithmetic example. FirstFile is not determining actual tax liability, refund eligibility, or a filing outcome.",
    sourceTitle: "IRS Publication 17",
    sourceUrl: "https://www.irs.gov/publications/p17",
  },
];

const W2_BOXES = [
  {
    box: "Box 1",
    name: "Wages, tips, other compensation",
    value: "$3,250.00",
    description: "The total taxable wages you earned from this employer during the calendar year. This is the primary figure entered on Line 1a of your Form 1040.",
    significance: "Box 1 helps determine taxable income, but it cannot by itself establish whether a return is required or what tax is owed. Other income and tax-year rules matter."
  },
  {
    box: "Box 2",
    name: "Federal income tax withheld",
    value: "$195.00",
    description: "The total federal income tax deducted from your paychecks throughout the year and sent to the IRS on your behalf.",
    significance: "The most important box for teen workers. If your annual tax liability is $0, this money may be returned to you as a refund when you file."
  },
  {
    box: "Box 3",
    name: "Social Security wages",
    value: "$3,250.00",
    description: "The total wages subject to the 6.2% Social Security payroll tax.",
    significance: "Usually identical to Box 1 for teen workers unless pre-tax retirement or health deductions apply."
  },
  {
    box: "Box 4",
    name: "Social Security tax withheld",
    value: "$201.50",
    description: "Exactly 6.2% of your Social Security wages ($3,250 × 0.062 = $201.50).",
    significance: "This is Social Security payroll tax, separate from federal income tax withholding in Box 2. It is generally not returned through an ordinary income-tax refund."
  },
  {
    box: "Box 5",
    name: "Medicare wages and tips",
    value: "$3,250.00",
    description: "The total wages subject to the 1.45% Medicare payroll tax.",
    significance: "Box 5 reports wages subject to Medicare tax. The Medicare wage base differs from Social Security; additional Medicare rules can apply at higher earnings."
  },
  {
    box: "Box 6",
    name: "Medicare tax withheld",
    value: "$47.13",
    description: "Exactly 1.45% of your Medicare wages ($3,250 × 0.0145 = $47.13).",
    significance: "Like Social Security, Medicare payroll taxes help fund healthcare programs and are not eligible for standard refund treatment."
  },
  {
    box: "Box 16",
    name: "State wages, tips, etc.",
    value: "$3,250.00",
    description: "Wages subject to state income taxation in your state of residence.",
    significance: "Used to complete your state income tax return if your state collects income tax."
  },
  {
    box: "Box 17",
    name: "State income tax",
    value: "$45.00",
    description: "The amount of state income tax withheld from your paychecks.",
    significance: "Similar to Box 2, any excess state withholding may be refunded when you file your state return."
  }
];

export default function PracticePage() {
  const [selectedBox, setSelectedBox] = useState(W2_BOXES[1]);
  const [activePractice, setActivePractice] = useState("w2");
  const [mockQuestionIndex, setMockQuestionIndex] = useState(0);
  const [mockAnswers, setMockAnswers] = useState({});
  const [showMockExplanation, setShowMockExplanation] = useState(false);
  const [mockFinished, setMockFinished] = useState(false);
  const mockResults = gradeQuiz(MOCK_RETURN_QUESTIONS, mockAnswers);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("tab") === "mock-return") {
      setActivePractice("mock-return");
    }
  }, []);

  const startMockReturn = () => {
    setMockQuestionIndex(0);
    setMockAnswers({});
    setShowMockExplanation(false);
    setMockFinished(false);
  };

  const handleMockAnswer = (answerIndex) => {
    if (showMockExplanation) return;
    setMockAnswers((previous) => ({ ...previous, [mockQuestionIndex]: answerIndex }));
    setShowMockExplanation(true);
  };

  const advanceMockReturn = () => {
    setShowMockExplanation(false);
    if (mockQuestionIndex + 1 < MOCK_RETURN_QUESTIONS.length) {
      setMockQuestionIndex((previous) => previous + 1);
    } else {
      setMockFinished(true);
    }
  };

  const goBackInMockReturn = () => {
    if (mockQuestionIndex > 0) {
      setMockQuestionIndex((previous) => previous - 1);
      setShowMockExplanation(false);
    }
  };

  const currentMockQuestion = MOCK_RETURN_QUESTIONS[mockQuestionIndex];

  return (
    <AppShell activeTab="practice">
      <div className="space-y-8">
        <div className="rounded-[2rem] border border-[#D9E7DF] bg-[#F7FBF8] p-6 shadow-soft sm:p-8">
          <span className="section-kicker">Fictional document learning lab</span>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.06em] text-[#123C32]">Form W-2 interactive explorer</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#41514A]">
            Explore a fictional W-2 document and learn how each field relates to your wages, taxes withheld, and year-end refund questions.
          </p>
        </div>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Practice activities">
          <button
            type="button"
            role="tab"
            aria-selected={activePractice === "w2"}
            onClick={() => setActivePractice("w2")}
            className={`rounded-full px-4 py-2.5 text-sm font-bold transition ${activePractice === "w2" ? "bg-[#123C32] text-white" : "border border-[#D9E7DF] bg-white text-[#41514A] hover:bg-[#F3F8F5]"}`}
          >
            W-2 explorer
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activePractice === "mock-return"}
            onClick={() => setActivePractice("mock-return")}
            className={`rounded-full px-4 py-2.5 text-sm font-bold transition ${activePractice === "mock-return" ? "bg-[#123C32] text-white" : "border border-[#D9E7DF] bg-white text-[#41514A] hover:bg-[#F3F8F5]"}`}
          >
            Mock return practice
          </button>
        </div>

        {activePractice === "w2" && (
        <div className="rounded-[2rem] border border-[#D9E7DF] bg-white p-4 shadow-soft sm:p-6">
          <div className="flex flex-col gap-3 border-b border-[#E8EDE7] pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6F7C74]">Sample document — fictional data</p>
              <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-[#123C32]">Form W-2: Wage and Tax Statement (2024)</h2>
            </div>
            <span className="rounded-full bg-[#FFF8E7] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#7A5E1F]">
              Sample employer: Pioneer City Bookstore LLC
            </span>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {W2_BOXES.map((boxItem) => {
              const isSelected = selectedBox.box === boxItem.box;
              return (
                <button
                  key={boxItem.box}
                  type="button"
                  onClick={() => setSelectedBox(boxItem)}
                  className={`rounded-[1.25rem] border p-3 text-left transition ${
                    isSelected
                      ? "border-[#123C32] bg-[#123C32] text-white shadow-sm"
                      : "border-[#E8EDE7] bg-[#F9FBFA] text-[#202923] hover:border-[#BBD9CD]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`text-[10px] font-bold uppercase tracking-[0.12em] ${isSelected ? "text-[#DCEEE7]" : "text-[#6F7C74]"}`}>
                      {boxItem.box}
                    </span>
                    <span className={`text-sm font-black ${isSelected ? "text-white" : "text-[#123C32]"}`}>
                      {boxItem.value}
                    </span>
                  </div>
                  <p className={`mt-3 text-sm font-semibold ${isSelected ? "text-[#EBF7F2]" : "text-[#41514A]"}`}>
                    {boxItem.name}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-[#E8EDE7] bg-[#F6FBF8] p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#176B52]">Selected field</p>
                <h3 className="mt-1 text-xl font-black tracking-[-0.03em] text-[#123C32]">{selectedBox.box} — {selectedBox.name}</h3>
              </div>
              <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#123C32] border border-[#D9E7DF]">
                Sample value: {selectedBox.value}
              </span>
            </div>

            <p className="mt-4 text-base leading-7 text-[#41514A]">{selectedBox.description}</p>
            <div className="mt-4 rounded-2xl border border-[#D9E7DF] bg-white p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6F7C74]">Why it matters</p>
              <p className="mt-2 text-base leading-7 text-[#41514A]">{selectedBox.significance}</p>
            </div>
          </div>
        </div>
        )}

        {activePractice === "mock-return" && (
          <section className="rounded-[2rem] border border-[#D9E7DF] bg-white p-5 shadow-soft sm:p-7" role="tabpanel">
            {!mockFinished ? (
              <div className="mx-auto max-w-3xl space-y-6">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6F7C74]">Fictional mock return · Step {mockQuestionIndex + 1} of {MOCK_RETURN_QUESTIONS.length}</span>
                    <span className="rounded-full bg-[#FFF8E7] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#7A5E1F]">No filing or submission</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E8EDE7]">
                    <div className="h-full rounded-full bg-[#176B52] transition-[width] duration-300" style={{ width: `${((mockQuestionIndex + 1) / MOCK_RETURN_QUESTIONS.length) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#176B52]">{currentMockQuestion.scenario}</p>
                  <h2 className="mt-2 text-2xl font-black leading-tight tracking-[-0.04em] text-[#123C32]">{currentMockQuestion.question}</h2>
                </div>

                <div className="space-y-3">
                  {currentMockQuestion.options.map((option, index) => {
                    const isCorrect = index === currentMockQuestion.correctIndex;
                    const isSelected = mockAnswers[mockQuestionIndex] === index;
                    let answerStyle = "border-[#E8EDE7] bg-[#F9FBFA] text-[#202923] hover:border-[#BBD9CD]";
                    if (showMockExplanation && isCorrect) answerStyle = "border-[#8CC1A3] bg-[#EAF7F3] text-[#123C32]";
                    else if (showMockExplanation && isSelected) answerStyle = "border-[#E9B8B8] bg-[#FDF1F1] text-[#5E2A2A]";
                    return (
                      <button
                        key={option}
                        type="button"
                        disabled={showMockExplanation}
                        onClick={() => handleMockAnswer(index)}
                        className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left text-sm leading-6 transition ${answerStyle}`}
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-[#123C32]">{String.fromCharCode(65 + index)}</span>
                        {option}
                      </button>
                    );
                  })}
                </div>

                {showMockExplanation && (
                  <div className="rounded-[1.5rem] border border-[#D9E7DF] bg-[#F6FBF8] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#176B52]">{mockAnswers[mockQuestionIndex] === currentMockQuestion.correctIndex ? "That’s right" : "Here’s the key idea"}</p>
                    <p className="mt-2 text-sm leading-6 text-[#41514A]">{currentMockQuestion.explanation}</p>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-[#E8EDE7] pt-4">
                  <button type="button" onClick={goBackInMockReturn} disabled={mockQuestionIndex === 0} className="text-sm font-semibold text-[#41514A] disabled:text-[#B5C0BB]">← Back</button>
                  <button type="button" onClick={advanceMockReturn} disabled={!showMockExplanation} className="primary-btn h-11 px-5 text-sm disabled:cursor-not-allowed disabled:opacity-45">
                    {mockQuestionIndex + 1 === MOCK_RETURN_QUESTIONS.length ? "See practice results" : "Continue"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="rounded-[1.5rem] bg-[#F6FBF8] p-5 text-center sm:p-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6F7C74]">Mock return practice results</p>
                  <h2 className="mt-3 text-4xl font-black tracking-[-0.06em] text-[#123C32]">{mockResults.correct} of {mockResults.total} correct</h2>
                  <p className="mt-2 text-lg font-bold text-[#176B52]">{mockResults.percentage}%</p>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#41514A]">This score measures your answers in a fictional lesson only. It is not a tax calculation, refund estimate, or filing determination.</p>
                  <button type="button" onClick={startMockReturn} className="primary-btn mt-5 h-11 px-5 text-sm">Start over</button>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-black tracking-[-0.03em] text-[#123C32]">What you practiced</h3>
                  {mockResults.results.map((result, index) => (
                    <article key={result.id} className="rounded-[1.25rem] border border-[#E8EDE7] bg-white p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-bold text-[#123C32]">{index + 1}. {result.scenario}</p>
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] ${result.isCorrect ? "bg-[#DDF3E7] text-[#176B52]" : "bg-[#FFF1D0] text-[#7A5E1F]"}`}>{result.isCorrect ? "Correct" : "Review"}</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[#41514A]">{result.question}</p>
                      <p className="mt-2 text-xs leading-5 text-[#6F7C74]">Your answer: {result.selectedAnswer ?? "No answer recorded"}</p>
                      {!result.isCorrect && <p className="mt-1 text-xs leading-5 text-[#176B52]">Correct answer: {result.correctAnswer}</p>}
                      <p className="mt-3 text-sm leading-6 text-[#41514A]">{result.explanation}</p>
                      <a href={result.sourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-xs font-semibold text-[#176B52] hover:underline">{result.sourceTitle} ↗</a>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </AppShell>
  );
}
