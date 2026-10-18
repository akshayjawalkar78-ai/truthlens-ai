"use client";

import { useState } from "react";
import { AppShell } from "../../components/AppShell.jsx";
import { calculatePaycheck } from "../../lib/calculator.js";

export default function PaycheckPage() {
  const [mode, setMode] = useState("hourly"); // "hourly" or "salary"
  const [hourlyRate, setHourlyRate] = useState("16.00");
  const [hoursWorked, setHoursWorked] = useState("20");
  const [grossPay, setGrossPay] = useState("320.00");
  const [payFrequency, setPayFrequency] = useState("biweekly");
  const [customFedWithholding, setCustomFedWithholding] = useState("");

  const effectiveGross = mode === "hourly"
    ? (Number(hourlyRate) || 0) * (Number(hoursWorked) || 0)
    : Number(grossPay) || 0;

  const result = calculatePaycheck({
    grossPay: effectiveGross,
    payFrequency,
    customFederalWithheld: customFedWithholding ? Number(customFedWithholding) : null
  });

  return (
    <AppShell activeTab="paycheck">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Interactive Learning Module
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
            Paycheck & Tax Deduction Lab
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Ever wonder why your direct deposit is less than your hourly wage multiplied by your hours? Use this interactive lab to see how mandatory FICA payroll taxes and estimated federal income tax withholdings affect take-home pay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Controls Form */}
          <div className="md:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Paycheck Parameters
            </h2>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMode("hourly")}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                  mode === "hourly" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-200"
                }`}
              >
                Hourly Wage
              </button>
              <button
                type="button"
                onClick={() => setMode("salary")}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                  mode === "salary" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-200"
                }`}
              >
                Fixed Gross Pay
              </button>
            </div>

            {mode === "hourly" ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hourly Wage ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.50"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-mono text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hours Worked</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={hoursWorked}
                    onChange={(e) => setHoursWorked(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-mono text-slate-900"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Gross Pay for Period ($)</label>
                <input
                  type="number"
                  min="0"
                  step="10"
                  value={grossPay}
                  onChange={(e) => setGrossPay(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-mono text-slate-900"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Pay Frequency</label>
              <select
                value={payFrequency}
                onChange={(e) => setPayFrequency(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-900"
              >
                <option value="weekly">Weekly (52 paychecks/year)</option>
                <option value="biweekly">Bi-Weekly (Every 2 weeks / 26 paychecks)</option>
                <option value="monthly">Monthly (12 paychecks/year)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Custom Federal Withheld ($) <span className="text-slate-400 font-normal">(Optional override)</span>
              </label>
              <input
                type="number"
                min="0"
                placeholder="Leave blank for automatic educational estimate"
                value={customFedWithholding}
                onChange={(e) => setCustomFedWithholding(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs text-slate-900 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Results Card */}
          <div className="md:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-baseline justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Calculated Paycheck Summary</h2>
              <span className="text-xs text-slate-500 font-medium">Deterministic Model</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Gross Earnings</span>
                <p className="text-2xl font-extrabold text-slate-900 mt-1">${result.grossPay.toFixed(2)}</p>
                <span className="text-[11px] text-slate-400">Total earned before taxes</span>
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Estimated Take-Home</span>
                <p className="text-2xl font-extrabold text-emerald-900 mt-1">${result.takeHomePay.toFixed(2)}</p>
                <span className="text-[11px] text-emerald-700">Actual money in pocket</span>
              </div>
            </div>

            {/* Deductions Breakdown */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Itemized Paycheck Deductions</h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Social Security Tax (6.2%)</span>
                  <span className="font-semibold text-slate-900">-${result.breakdown.socialSecurity.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Medicare Tax (1.45%)</span>
                  <span className="font-semibold text-slate-900">-${result.breakdown.medicare.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">
                    Federal Income Tax Withholding {result.breakdown.isWithholdingEstimated && "(Estimated)"}
                  </span>
                  <span className="font-semibold text-slate-900">-${result.breakdown.federalWithholding.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">State Income Tax Withholding</span>
                  <span className="font-semibold text-slate-900">-${result.breakdown.stateWithholding.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 font-bold text-slate-900">
                  <span>Total Withholdings Deducted</span>
                  <span>-${result.totalDeductions.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Educational Takeaways */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-700">
              <span className="font-bold text-slate-900">Why this matters:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                {result.educationalNotes.map((note, idx) => (
                  <li key={idx} className="leading-relaxed">{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
