"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "../components/AppShell.jsx";
import { PRELOADED_SCENARIOS } from "../data/scenarios.js";
import { generateChecklist } from "../lib/checklist.js";

const STORAGE_KEY = "firstfile-checklist-progress";

const featureCards = [
  {
    title: "Build your checklist",
    description: "Organize the documents, questions, and decisions you may need to review before filing.",
    href: "#questionnaire",
    accent: "bg-[#DDF3E7] text-[#123C32]",
  },
  {
    title: "Learn with examples",
    description: "Explore real-world student scenarios that explain wages, withholding, and refunds in plain language.",
    href: "/learn",
    accent: "bg-[#EAF7F3] text-[#176B52]",
  },
  {
    title: "Practice with confidence",
    description: "Use fictional W-2s and mock return exercises to build understanding without sharing real information.",
    href: "/practice",
    accent: "bg-[#FFF3D6] text-[#7A5E1F]",
  },
];

const toolPreview = [
  { heading: "W-2 explorer", meta: "Sample document", tone: "bg-[#E8F5EE] text-[#123C32]" },
  { heading: "Paycheck lab", meta: "Calculator", tone: "bg-[#F4F7F6] text-[#176B52]" },
  { heading: "Scenario quiz", meta: "Practice", tone: "bg-[#FFF7E6] text-[#7A5E1F]" },
];

const processSteps = [
  "Tell us about your situation.",
  "Explore your personalized learning checklist.",
  "Learn, practice, and use official resources.",
];

export default function HomePage() {
  const initialAnswers = {
    taxYear: "2024",
    incomeTypes: ["w2-wages"],
    documents: ["w2"],
    dependentStatus: "yes",
    multipleIncome: "no",
    state: "CA",
    uncertainties: [],
  };

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState(initialAnswers);
  const [checklist, setChecklist] = useState(() => generateChecklist(initialAnswers));
  const [activeScenarioId, setActiveScenarioId] = useState("summer-job-w2");
  const [completedItems, setCompletedItems] = useState({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.completedItems) setCompletedItems(parsed.completedItems);
        if (parsed.step) setStep(parsed.step);
        if (parsed.activeScenarioId) setActiveScenarioId(parsed.activeScenarioId);
        if (parsed.answers) setChecklist(generateChecklist(parsed.answers));
      }
    } catch (error) {
      console.warn("Unable to read saved checklist state", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const payload = { answers, completedItems, step, activeScenarioId };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [answers, completedItems, step, activeScenarioId, hydrated]);

  const progressValue = checklist.items.length
    ? Math.round((Object.values(completedItems).filter(Boolean).length / checklist.items.length) * 100)
    : 0;

  const handleToggleItem = (id) => {
    setCompletedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLoadScenario = (scen) => {
    setActiveScenarioId(scen.id);
    setAnswers(scen.answers);
    setChecklist(generateChecklist(scen.answers));
    setCompletedItems({});
    setStep(1);
  };

  const handleUpdateAnswer = (field, value) => {
    const updated = { ...answers, [field]: value };
    setAnswers(updated);
    setChecklist(generateChecklist(updated));
  };

  const handleToggleArrayItem = (field, val) => {
    const current = answers[field] || [];
    const exists = current.includes(val);
    const next = exists ? current.filter((x) => x !== val) : [...current, val];
    handleUpdateAnswer(field, next);
  };

  const resetChecklist = () => {
    setCompletedItems({});
    setStep(1);
    setAnswers(initialAnswers);
    setChecklist(generateChecklist(initialAnswers));
    setActiveScenarioId("summer-job-w2");
  };

  return (
    <AppShell activeTab="home">
      <section className="relative overflow-hidden rounded-[2rem] border border-[#D9E7DF] bg-[#F7FBF8] p-6 shadow-soft sm:p-8 lg:p-10">
        <div className="absolute -right-10 top-8 h-52 w-52 rounded-full bg-[#DDF3E7]/80 blur-3xl" aria-hidden="true" />
        <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-[#E8B65A]/12 blur-3xl" aria-hidden="true" />

        <div className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <span className="section-kicker">Taxes, made less intimidating</span>
            <h1 className="mt-5 max-w-xl text-4xl font-black tracking-[-0.06em] text-[#123C32] sm:text-5xl">
              Your first tax return. A clearer first step.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#41514A]">
              FirstFile helps students and first-time filers understand forms, paychecks, deductions, and filing basics through practical checklists, examples, and official guidance.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#questionnaire" className="primary-btn h-12 px-5 text-sm sm:text-[0.92rem]">
                Build my checklist
              </a>
              <Link href="/learn" className="secondary-btn h-12 px-5 text-sm sm:text-[0.92rem]">
                Explore the learning lab
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[#6F7C74]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D7E5E0] bg-white px-3 py-1.5 font-medium">
                <span className="h-2 w-2 rounded-full bg-[#176B52]" />
                Free to explore
              </span>
              <span>No SSN or real tax docs required</span>
            </div>
          </div>

          <div className="relative">
            <div className="panel-surface relative overflow-hidden p-4 sm:p-5">
              <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[#DDF3E7] blur-2xl" aria-hidden="true" />
              <div className="absolute -left-4 bottom-3 h-20 w-20 rounded-full bg-[#E8B65A]/15 blur-2xl" aria-hidden="true" />

              <div className="relative space-y-4">
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#F3F8F5] p-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#6F7C74]">Your tax learning plan</p>
                    <h3 className="mt-1 text-lg font-bold text-[#123C32]">Student filing basics</h3>
                  </div>
                  <span className="rounded-full bg-[#DDF3E7] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#176B52]">
                    {progressValue}% complete
                  </span>
                </div>

                <div className="rounded-2xl border border-[#D9E7DF] bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#6F7C74]">Checklist progress</span>
                    <span className="text-sm font-bold text-[#123C32]">{progressValue}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-[#E8EDE7]">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#176B52] to-[#123C32]" style={{ width: `${progressValue}%` }} />
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Confirm W-2 details", done: true, tone: "text-[#176B52]" },
                    { label: "Review dependent status", done: true, tone: "text-[#176B52]" },
                    { label: "Check gig income rules", done: false, tone: "text-[#7A5E1F]" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-xl border border-[#E8EDE7] bg-[#FAFDFC] px-3 py-2.5">
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full ${item.done ? "bg-[#DDF3E7] text-[#176B52]" : "bg-[#FFF1D0] text-[#7A5E1F]"}`}>
                          {item.done ? "✓" : "•"}
                        </span>
                        <span className="text-sm font-medium text-[#202923]">{item.label}</span>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-[0.12em] ${item.done ? "text-[#176B52]" : "text-[#7A5E1F]"}`}>
                        {item.done ? "done" : "next"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-[#D9E7DF] bg-[#123C32] p-4 text-white">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#DDE9E5]">Next step</p>
                      <h4 className="mt-1 text-base font-bold">Review gig work rules</h4>
                    </div>
                    <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em]">2 min</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#E8EDE7] bg-[#FAF9F6] p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#6F7C74]">W-2 preview</span>
                    <span className="rounded-full bg-[#FFF8E7] px-2 py-0.5 text-[10px] font-bold text-[#7A5E1F]">Sample</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-[#41514A]">
                    <div className="rounded-xl bg-white p-2.5 shadow-sm"><span className="block text-[10px] uppercase text-[#6F7C74]">Box 1</span><strong className="mt-1 block text-sm font-bold text-[#123C32]">$3,250</strong></div>
                    <div className="rounded-xl bg-white p-2.5 shadow-sm"><span className="block text-[10px] uppercase text-[#6F7C74]">Box 2</span><strong className="mt-1 block text-sm font-bold text-[#123C32]">$195</strong></div>
                    <div className="rounded-xl bg-white p-2.5 shadow-sm"><span className="block text-[10px] uppercase text-[#6F7C74]">Box 4</span><strong className="mt-1 block text-sm font-bold text-[#123C32]">$201.50</strong></div>
                    <div className="rounded-xl bg-white p-2.5 shadow-sm"><span className="block text-[10px] uppercase text-[#6F7C74]">Box 17</span><strong className="mt-1 block text-sm font-bold text-[#123C32]">$45</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <span className="section-kicker">Understand your next steps</span>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-[#123C32]">A clear path for your first filing questions</h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featureCards.map((card) => (
            <Link key={card.title} href={card.href} className="group panel-surface block p-5 transition hover:-translate-y-1 hover:shadow-soft">
              <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${card.accent}`}>
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 12.5h10M7 8.5h10M7 16.5h6" />
                  <path d="M6.5 4.5h10.5l3 3v11.5a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2Z" />
                </svg>
              </div>
              <h3 className="mt-5 text-xl font-bold text-[#123C32]">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#41514A]">{card.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#176B52]">
                Explore
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-[2rem] border border-[#D9E7DF] bg-[#F6FBF8] p-6 sm:p-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <span className="section-kicker">Explore the learning lab</span>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-[#123C32]">Practice with the tools students actually use</h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {toolPreview.map((item, index) => (
            <div key={item.heading} className="rounded-[1.5rem] border border-[#D9E7DF] bg-white p-4 shadow-sm">
              <div className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${item.tone}`}>
                {item.meta}
              </div>
              <div className="mt-4 rounded-2xl border border-[#E7EFEA] bg-[#F9FBFA] p-4">
                {index === 0 && (
                  <div className="space-y-2 text-xs text-[#41514A]">
                    <div className="flex justify-between"><span>Box 1</span><strong className="text-[#123C32]">$3,250</strong></div>
                    <div className="flex justify-between"><span>Box 2</span><strong className="text-[#123C32]">$195</strong></div>
                    <div className="flex justify-between"><span>Box 17</span><strong className="text-[#123C32]">$45</strong></div>
                  </div>
                )}
                {index === 1 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#41514A]"><span>Gross pay</span><strong className="text-[#123C32]">$320.00</strong></div>
                    <div className="h-2 rounded-full bg-[#E8EDE7]">
                      <div className="h-full w-[72%] rounded-full bg-[#176B52]" />
                    </div>
                    <div className="text-xs text-[#41514A]">Estimated take-home: <strong className="text-[#123C32]">$254.84</strong></div>
                  </div>
                )}
                {index === 2 && (
                  <div className="space-y-2 text-xs text-[#41514A]">
                    <div className="rounded-xl bg-[#E8F7F1] p-2 text-[#123C32] font-semibold">Q: When is a W-2 needed?</div>
                    <div className="rounded-xl bg-[#FFF8E7] p-2 text-[#7A5E1F] font-medium">A: After an employer pays you wages</div>
                  </div>
                )}
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#123C32]">{item.heading}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-6">
          <span className="section-kicker">How FirstFile works</span>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-[#123C32]">Simple steps that build understanding</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {processSteps.map((stepText, index) => (
            <div key={stepText} className="panel-surface p-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#6F7C74]">Step {index + 1}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DDF3E7] text-sm font-black text-[#123C32]">{index + 1}</span>
              </div>
              <p className="mt-5 text-lg font-bold text-[#123C32] leading-7">{stepText}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-[2rem] border border-[#D9E7DF] bg-[#123C32] p-6 text-white shadow-soft sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <span className="section-kicker bg-white/10 text-[#EAF7F3] border-white/10">Trust and transparency</span>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white">FirstFile is for learning, not for filing your real return.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#EAF7F3]">
              It is an educational tool designed to explain tax basics, not a replacement for official tax guidance or professional advice. You do not need to enter your SSN, bank details, or real forms to explore the experience.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-sm text-[#EAF7F3]">
            <div className="mb-3 flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#DDF3E7] text-[#123C32] font-black">✓</span>
              <span className="text-base font-bold text-white">What this tool does not ask for</span>
            </div>
            <ul className="space-y-2 text-[#EAF7F3]">
              <li>• Social Security numbers</li>
              <li>• Banking or routing numbers</li>
              <li>• Real W-2s, 1099s, or prior returns</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="questionnaire" className="mt-16 rounded-[2rem] border border-[#D9E7DF] bg-[#F9FBFA] p-5 shadow-soft sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="section-kicker">Build your checklist</span>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-[#123C32]">Personalized learning guide</h2>
          </div>
          <button type="button" onClick={resetChecklist} className="secondary-btn h-11 px-4 text-xs font-bold uppercase tracking-[0.1em]">
            Reset progress
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-[1.5rem] border border-[#D9E7DF] bg-white p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between border-b border-[#E8EDE7] pb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#6F7C74]">Step {step} of 4</p>
                <h3 className="mt-1 text-xl font-bold text-[#123C32]">Tax readiness questionnaire</h3>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setStep(value)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                      step === value ? "bg-[#123C32] text-white" : "bg-[#E8EDE7] text-[#41514A] hover:bg-[#DDF3E7]"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <h4 className="text-base font-bold text-[#123C32]">1. What types of income did you earn this year?</h4>
                <p className="text-sm text-[#41514A]">Select all that apply. Many teen workers have more than one income type.</p>
                <div className="space-y-3">
                  {[
                    { id: "w2-wages", label: "Hourly or salaried wages from a job" },
                    { id: "freelance-gig", label: "Independent work, tutoring, or gig jobs" },
                    { id: "online-business", label: "Online sales or creative side work" },
                    { id: "not-sure", label: "Not sure yet / exploring future income" },
                  ].map((option) => (
                    <label key={option.id} className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#E8EDE7] bg-[#F9FBFA] p-3 text-sm text-[#202923] transition hover:border-[#BBD9CD]">
                      <input
                        type="checkbox"
                        checked={answers.incomeTypes.includes(option.id)}
                        onChange={() => handleToggleArrayItem("incomeTypes", option.id)}
                        className="mt-1 h-4 w-4 rounded border-[#A7C2B5] text-[#176B52]"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h4 className="text-base font-bold text-[#123C32]">2. Which tax documents do you expect to receive?</h4>
                <p className="text-sm text-[#41514A]">Employers usually send Form W-2 by January 31.</p>
                <div className="space-y-3">
                  {[
                    { id: "w2", label: "Form W-2" },
                    { id: "1099-nec", label: "Form 1099-NEC or 1099-K" },
                    { id: "no-docs-yet", label: "No tax documents yet" },
                    { id: "unsure-docs", label: "Not sure which forms apply" },
                  ].map((option) => (
                    <label key={option.id} className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#E8EDE7] bg-[#F9FBFA] p-3 text-sm text-[#202923] transition hover:border-[#BBD9CD]">
                      <input
                        type="checkbox"
                        checked={answers.documents.includes(option.id)}
                        onChange={() => handleToggleArrayItem("documents", option.id)}
                        className="mt-1 h-4 w-4 rounded border-[#A7C2B5] text-[#176B52]"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h4 className="text-base font-bold text-[#123C32]">3. Might someone claim you as a dependent?</h4>
                <div className="space-y-3">
                  {[
                    { id: "yes", label: "Yes, a parent or guardian likely claims me" },
                    { id: "no", label: "No, I support myself or live independently" },
                    { id: "unsure", label: "I am not sure yet" },
                  ].map((option) => (
                    <label key={option.id} className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#E8EDE7] bg-[#F9FBFA] p-3 text-sm text-[#202923] transition hover:border-[#BBD9CD]">
                      <input
                        type="radio"
                        name="dependentStatus"
                        checked={answers.dependentStatus === option.id}
                        onChange={() => handleUpdateAnswer("dependentStatus", option.id)}
                        className="mt-1 h-4 w-4 text-[#176B52]"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
                <div className="rounded-2xl border border-[#DCECE2] bg-[#EAF7F3] p-3 text-sm text-[#123C32]">
                  Being claimed as a dependent does not automatically prevent you from filing a return to claim a refund.
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h4 className="text-base font-bold text-[#123C32]">4. Final details: multiple jobs and state</h4>
                <div className="space-y-3">
                  <div>
                    <p className="mb-2 text-sm font-semibold text-[#123C32]">Did you work more than one job this year?</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <label className="flex items-center gap-2 text-[#202923]">
                        <input type="radio" name="multipleIncome" checked={answers.multipleIncome === "yes"} onChange={() => handleUpdateAnswer("multipleIncome", "yes")} />
                        Yes
                      </label>
                      <label className="flex items-center gap-2 text-[#202923]">
                        <input type="radio" name="multipleIncome" checked={answers.multipleIncome === "no"} onChange={() => handleUpdateAnswer("multipleIncome", "no")} />
                        No
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#123C32]">State of tax residence</label>
                    <select value={answers.state} onChange={(e) => handleUpdateAnswer("state", e.target.value)} className="form-input h-11 px-3 text-sm">
                      <option value="CA">California</option>
                      <option value="TX">Texas</option>
                      <option value="NY">New York</option>
                      <option value="FL">Florida</option>
                      <option value="IL">Illinois</option>
                      <option value="OH">Ohio</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-[#E8EDE7] pt-4">
              <button type="button" onClick={() => setStep((prev) => Math.max(1, prev - 1))} disabled={step === 1} className="text-sm font-semibold text-[#41514A] disabled:text-[#B5C0BB]">
                ← Previous
              </button>
              <button type="button" onClick={() => setStep((prev) => Math.min(4, prev + 1))} disabled={step === 4} className="primary-btn h-11 px-5 text-sm">
                Next step
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-[1.5rem] border border-[#D9E7DF] bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-[#E8EDE7] pb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#6F7C74]">Live result</p>
                <h3 className="mt-1 text-xl font-bold text-[#123C32]">Your action plan</h3>
              </div>
              <span className="rounded-full bg-[#E8F5EE] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#176B52]">
                {progressValue}%
              </span>
            </div>

            <div className="mt-4 rounded-2xl border border-[#E8EDE7] bg-[#F5FAF7] p-4">
              <div className="mb-3 flex items-center justify-between text-xs font-medium text-[#41514A]">
                <span>Educational progress</span>
                <span className="font-bold text-[#123C32]">{progressValue}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-[#E8EDE7]">
                <div className="h-full rounded-full bg-gradient-to-r from-[#176B52] to-[#123C32]" style={{ width: `${progressValue}%` }} />
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-[#41514A]">{checklist.summary.estimatedFilingNeed}</p>

            <div className="mt-5 space-y-3">
              {checklist.items.map((item) => {
                const isChecked = !!completedItems[item.id];
                return (
                  <div key={item.id} className={`rounded-2xl border p-3 ${isChecked ? "border-[#D9E7DF] bg-[#F6FBF8]" : "border-[#E8EDE7] bg-white"}`}>
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleItem(item.id)}
                        id={`dashboard-${item.id}`}
                        className="mt-1 h-4 w-4 rounded border-[#A7C2B5] text-[#176B52]"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <label htmlFor={`dashboard-${item.id}`} className={`text-sm font-bold ${isChecked ? "text-[#6F7C74] line-through" : "text-[#123C32]"}`}>
                            {item.title}
                          </label>
                          <span className="rounded-full bg-[#E8EDE7] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#41514A]">
                            {item.category}
                          </span>
                        </div>
                        <p className="mt-2 text-xs leading-5 text-[#41514A]">{item.description}</p>
                        {item.actionLink && (
                          <div className="mt-3">
                            {item.isExternal ? (
                              <a href={item.actionLink} target="_blank" rel="noreferrer" className="text-xs font-semibold text-[#176B52] hover:underline">
                                {item.actionText} ↗
                              </a>
                            ) : (
                              <Link href={item.actionLink} className="text-xs font-semibold text-[#176B52] hover:underline">
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
      </section>
    </AppShell>
  );
}
