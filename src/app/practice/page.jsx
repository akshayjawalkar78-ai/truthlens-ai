"use client";

import { useState } from "react";
import { AppShell } from "../../components/AppShell.jsx";

const W2_BOXES = [
  {
    box: "Box 1",
    name: "Wages, tips, other compensation",
    value: "$3,250.00",
    description: "The total taxable wages you earned from this employer during the calendar year. This is the primary figure entered on Line 1a of your Form 1040.",
    significance: "If this number is below the standard deduction threshold for dependents, you will generally owe $0 in federal income taxes."
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
    significance: "Mandatory FICA tax required by federal law. Unlike federal income tax in Box 2, Social Security taxes are generally not refunded."
  },
  {
    box: "Box 5",
    name: "Medicare wages and tips",
    value: "$3,250.00",
    description: "The total wages subject to the 1.45% Medicare payroll tax.",
    significance: "All employee wages are subject to Medicare tax with no annual wage cap."
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
      </div>
    </AppShell>
  );
}
