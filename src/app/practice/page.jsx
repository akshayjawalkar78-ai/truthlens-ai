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
    significance: "The most important box for teen workers! If your calculated tax liability is $0, this entire $195 is refunded to you when you file."
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
    significance: "Mandatory FICA tax required by federal law. Unlike federal income tax in Box 2, Social Security taxes are NOT refunded when filing a tax return."
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
    significance: "Like Social Security, Medicare payroll taxes fund federal healthcare programs and are not eligible for standard annual income tax refunds."
  },
  {
    box: "Box 16",
    name: "State wages, tips, etc.",
    value: "$3,250.00",
    description: "Wages subject to state income taxation in your state of residence.",
    significance: "Used to complete your state income tax return (if your state collects income tax)."
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
  const [selectedBox, setSelectedBox] = useState(W2_BOXES[1]); // Default to Box 2

  return (
    <AppShell activeTab="practice">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Fictional Document Learning Lab
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
            Form W-2 Interactive Explorer
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Every January, employers send Form W-2. Click any box on the sample tax form below to discover what that number represents, how the IRS treats it, and why it matters for your refund.
          </p>
        </div>

        {/* Fictional Sample W-2 Container */}
        <div className="bg-white border-2 border-slate-300 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Fictional Educational Sample • Not a Real Tax Document
              </span>
              <h2 className="text-base font-bold text-slate-900">
                Form W-2: Wage and Tax Statement (2024)
              </h2>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded">
              Sample Employer: Pioneer City Bookstore LLC
            </span>
          </div>

          {/* Interactive Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {W2_BOXES.map((boxItem) => {
              const isSelected = selectedBox.box === boxItem.box;
              return (
                <button
                  key={boxItem.box}
                  type="button"
                  onClick={() => setSelectedBox(boxItem)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70"
                  }`}
                >
                  <div className="flex items-baseline justify-between mb-1">
                    <span className={`text-xs font-bold ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                      {boxItem.box}
                    </span>
                    <span className={`font-mono text-sm font-bold ${isSelected ? "text-white" : "text-slate-900"}`}>
                      {boxItem.value}
                    </span>
                  </div>
                  <p className={`text-xs leading-snug font-medium line-clamp-1 ${isSelected ? "text-slate-200" : "text-slate-700"}`}>
                    {boxItem.name}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Selected Field Explainer Panel */}
          {selectedBox && (
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">
                  Detailed Explanation: {selectedBox.box} — {selectedBox.name}
                </span>
                <span className="text-xs font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                  Sample: {selectedBox.value}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedBox.description}
              </p>

              <div className="pt-2 border-t border-slate-200/60 text-xs text-slate-800">
                <strong className="text-slate-900">Why it matters for first-time filers:</strong>{" "}
                {selectedBox.significance}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
