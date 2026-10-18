"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "../components/AppShell.jsx";
import { PRELOADED_SCENARIOS } from "../data/scenarios.js";
import { generateChecklist } from "../lib/checklist.js";

export default function HomePage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    taxYear: "2024",
    incomeTypes: ["w2-wages"],
    documents: ["w2"],
    dependentStatus: "yes",
    multipleIncome: "no",
    state: "CA",
    uncertainties: []
  });

  const [checklist, setChecklist] = useState(() => generateChecklist({
    taxYear: "2024",
    incomeTypes: ["w2-wages"],
    documents: ["w2"],
    dependentStatus: "yes",
    multipleIncome: "no",
    state: "CA",
    uncertainties: []
  }));

  const [activeScenarioId, setActiveScenarioId] = useState("summer-job-w2");
  const [completedItems, setCompletedItems] = useState({});

  const handleToggleItem = (id) => {
    setCompletedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleLoadScenario = (scen) => {
    setActiveScenarioId(scen.id);
    setAnswers(scen.answers);
    const newChecklist = generateChecklist(scen.answers);
    setChecklist(newChecklist);
    setCompletedItems({});
  };

  const handleUpdateAnswer = (field, value) => {
    const updated = { ...answers, [field]: value };
    setAnswers(updated);
    setChecklist(generateChecklist(updated));
  };

  const handleToggleArrayItem = (field, val) => {
    const current = answers[field] || [];
    const exists = current.includes(val);
    const next = exists ? current.filter(x => x !== val) : [...current, val];
    handleUpdateAnswer(field, next);
  };

  return (
    <AppShell activeTab="home">
      {/* Editorial Hero Section */}
      <section className="mb-12 border-b border-slate-200 pb-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-200 text-slate-800 text-[11px] font-semibold mb-3">
            <span>Tax Year 2024 / 2025</span>
            <span>•</span>
            <span>First-Time Filer Readiness</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Your first tax return shouldn't feel like a foreign language.
          </h1>

          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            FirstFile is a free educational platform designed for student workers, teenagers, and first-time filers. Learn how W-2 and 1099 forms work, build your personalized filing readiness checklist, and explore legitimate filing resources.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#questionnaire"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors"
            >
              Build My Tax Checklist
            </a>
            <Link
              href="/paycheck"
              className="px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-medium text-xs rounded-lg transition-colors"
            >
              Explore Paycheck Lab
            </Link>
            <Link
              href="/practice"
              className="px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-medium text-xs rounded-lg transition-colors"
            >
              Practice with Sample W-2
            </Link>
          </div>
        </div>
      </section>

      {/* Preloaded Realistic Teen Scenarios */}
      <section className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Explore Real-Life Student Scenarios</h2>
            <p className="text-xs text-slate-500 mt-0.5">Click any student situation to populate the questionnaire and test your checklist</p>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 sm:mt-0 font-medium">100% Offline Demonstrable</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRELOADED_SCENARIOS.map((scen) => {
            const isSelected = activeScenarioId === scen.id;
            return (
              <button
                key={scen.id}
                onClick={() => handleLoadScenario(scen)}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? "bg-white border-slate-900 shadow-sm ring-1 ring-slate-900"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {scen.badge}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1">{scen.title}</h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                    {scen.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900">
                  <span>{isSelected ? "Active Scenario" : "Load Scenario"}</span>
                  <span>→</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Interactive Two-Column Section: Questionnaire & Live Checklist */}
      <div id="questionnaire" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Questionnaire */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Step {step} of 4</span>
              <h2 className="text-lg font-bold text-slate-900">Tax Readiness Questionnaire</h2>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(s => (
                <button
                  key={s}
                  onClick={() => setStep(s)}
                  className={`w-7 h-7 rounded text-xs font-semibold flex items-center justify-center transition-colors ${
                    step === s ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Step 1: Income Types */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">1. What types of income did you earn this year?</h3>
              <p className="text-xs text-slate-500">Select all that apply. Teenagers often have more than one income category.</p>

              <div className="space-y-2">
                {[
                  { id: "w2-wages", label: "Hourly or salaried wages from a job (retail, food, camp, etc.)" },
                  { id: "freelance-gig", label: "Independent gig work, tutoring, babysitting, yard work" },
                  { id: "online-business", label: "Online reselling, digital crafts, content creation" },
                  { id: "not-sure", label: "Not sure / Exploring for the future" }
                ].map(opt => (
                  <label
                    key={opt.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={answers.incomeTypes.includes(opt.id)}
                      onChange={() => handleToggleArrayItem("incomeTypes", opt.id)}
                      className="mt-0.5 rounded text-slate-900 focus:ring-slate-900"
                    />
                    <span className="text-slate-800 leading-snug">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Documents Received */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">2. Which tax documents do you have or expect to receive?</h3>
              <p className="text-xs text-slate-500">Employers must deliver Form W-2 by January 31.</p>

              <div className="space-y-2">
                {[
                  { id: "w2", label: "Form W-2 (Wage and Tax Statement from employer)" },
                  { id: "1099-nec", label: "Form 1099-NEC / 1099-K (Freelance or contract income)" },
                  { id: "no-docs-yet", label: "No tax documents received yet" },
                  { id: "unsure-docs", label: "Not sure which tax forms apply to my job" }
                ].map(opt => (
                  <label
                    key={opt.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={answers.documents.includes(opt.id)}
                      onChange={() => handleToggleArrayItem("documents", opt.id)}
                      className="mt-0.5 rounded text-slate-900 focus:ring-slate-900"
                    />
                    <span className="text-slate-800 leading-snug">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Dependent Status */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">3. Might someone claim you as a dependent?</h3>
              <p className="text-xs text-slate-500">If your parents or guardians pay for more than half your living expenses, they usually claim you.</p>

              <div className="space-y-2 text-xs">
                {[
                  { id: "yes", label: "Yes, my parents or guardians claim me as a dependent" },
                  { id: "no", label: "No, I support myself or am an independent adult" },
                  { id: "unsure", label: "I am not sure / Need to check with family" }
                ].map(opt => (
                  <label
                    key={opt.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="dependentStatus"
                      checked={answers.dependentStatus === opt.id}
                      onChange={() => handleUpdateAnswer("dependentStatus", opt.id)}
                      className="mt-0.5 text-slate-900 focus:ring-slate-900"
                    />
                    <span className="text-slate-800 leading-snug">{opt.label}</span>
                  </label>
                ))}
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-[11px] text-blue-900 leading-relaxed">
                <strong>Important Fact:</strong> Being a dependent does NOT prevent you from filing your own return to claim your refund! You simply check the box on your return stating someone can claim you.
              </div>
            </div>
          )}

          {/* Step 4: Multiple Incomes & State */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">4. Final Details: Multiple Employers & State</h3>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-2">Did you have more than one job in the same calendar year?</label>
                <div className="flex gap-4 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="multipleIncome"
                      checked={answers.multipleIncome === "yes"}
                      onChange={() => handleUpdateAnswer("multipleIncome", "yes")}
                    />
                    <span>Yes, multiple jobs</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="multipleIncome"
                      checked={answers.multipleIncome === "no"}
                      onChange={() => handleUpdateAnswer("multipleIncome", "no")}
                    />
                    <span>No, single job</span>
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-800 mb-1">State of Tax Residence:</label>
                <select
                  value={answers.state}
                  onChange={(e) => handleUpdateAnswer("state", e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200 text-xs bg-white text-slate-900"
                >
                  <option value="CA">California</option>
                  <option value="TX">Texas (No state income tax)</option>
                  <option value="NY">New York</option>
                  <option value="FL">Florida (No state income tax)</option>
                  <option value="IL">Illinois</option>
                  <option value="OH">Ohio</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="OTHER">Other State</option>
                </select>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(prev => Math.max(1, prev - 1))}
              disabled={step === 1}
              className="px-4 py-2 text-xs font-semibold text-slate-600 disabled:text-slate-300 hover:text-slate-900 transition-colors"
            >
              ← Previous
            </button>

            <button
              type="button"
              onClick={() => setStep(prev => Math.min(4, prev + 1))}
              disabled={step === 4}
              className="px-4 py-2 bg-slate-900 disabled:bg-slate-200 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Next Step →
            </button>
          </div>
        </div>

        {/* Right Column: Live Personalized Checklist */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Live Result</span>
              <h2 className="text-lg font-bold text-slate-900">Your Actionable Tax Checklist</h2>
            </div>
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
              {Object.values(completedItems).filter(Boolean).length} of {checklist.items.length} Ready
            </span>
          </div>

          <p className="text-xs text-slate-600 font-medium">
            {checklist.summary.estimatedFilingNeed}
          </p>

          <div className="space-y-3">
            {checklist.items.map((item) => {
              const isChecked = !!completedItems[item.id];
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isChecked
                      ? "bg-slate-50 border-slate-200 opacity-75"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id={`chk-${item.id}`}
                      checked={isChecked}
                      onChange={() => handleToggleItem(item.id)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <label
                          htmlFor={`chk-${item.id}`}
                          className={`text-xs font-bold cursor-pointer ${
                            isChecked ? "line-through text-slate-400" : "text-slate-900"
                          }`}
                        >
                          {item.title}
                        </label>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                          {item.category}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="mt-2 text-[11px] text-slate-500 italic">
                        <strong>Why it matters:</strong> {item.whyItMatters}
                      </div>

                      {item.actionLink && (
                        <div className="mt-3">
                          {item.isExternal ? (
                            <a
                              href={item.actionLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-semibold text-blue-900 hover:underline"
                            >
                              {item.actionText} ↗
                            </a>
                          ) : (
                            <Link
                              href={item.actionLink}
                              className="text-xs font-semibold text-blue-900 hover:underline"
                            >
                              {item.actionText} →
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
