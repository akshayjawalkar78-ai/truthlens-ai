"use client";

import { useMemo, useState } from "react";
import { AppShell } from "../../components/AppShell.jsx";
import { calculatePaycheck } from "../../lib/calculator.js";

const initialValues = {
  hourlyRate: "16.00",
  hoursWorked: "20",
  grossPay: "320.00",
  payFrequency: "biweekly",
  customFedWithholding: "",
};

export default function PaycheckPage() {
  const [mode, setMode] = useState("hourly");
  const [hourlyRate, setHourlyRate] = useState(initialValues.hourlyRate);
  const [hoursWorked, setHoursWorked] = useState(initialValues.hoursWorked);
  const [grossPay, setGrossPay] = useState(initialValues.grossPay);
  const [payFrequency, setPayFrequency] = useState(initialValues.payFrequency);
  const [customFedWithholding, setCustomFedWithholding] = useState(initialValues.customFedWithholding);

  const validationMessage = useMemo(() => {
    const rate = Number(hourlyRate);
    const hours = Number(hoursWorked);
    const fixedGross = Number(grossPay);

    if (mode === "hourly" && (Number.isNaN(rate) || Number.isNaN(hours) || rate < 0 || hours < 0)) {
      return "Hourly wage and hours must be zero or greater.";
    }
    if (mode === "salary" && (Number.isNaN(fixedGross) || fixedGross < 0)) {
      return "Gross pay must be zero or greater.";
    }
    if (customFedWithholding && Number(customFedWithholding) < 0) {
      return "Optional withholding cannot be negative.";
    }
    return "";
  }, [mode, hourlyRate, hoursWorked, grossPay, customFedWithholding]);

  const effectiveGross = mode === "hourly"
    ? (Number(hourlyRate) || 0) * (Number(hoursWorked) || 0)
    : Number(grossPay) || 0;

  const result = calculatePaycheck({
    grossPay: effectiveGross,
    payFrequency,
    customFederalWithheld: customFedWithholding ? Number(customFedWithholding) : null,
  });

  const resetForm = () => {
    setMode("hourly");
    setHourlyRate(initialValues.hourlyRate);
    setHoursWorked(initialValues.hoursWorked);
    setGrossPay(initialValues.grossPay);
    setPayFrequency(initialValues.payFrequency);
    setCustomFedWithholding(initialValues.customFedWithholding);
  };

  return (
    <AppShell activeTab="paycheck">
      <div className="space-y-8">
        <div className="rounded-[2rem] border border-[#D9E7DF] bg-[#F7FBF8] p-6 shadow-soft sm:p-8">
          <span className="section-kicker">Interactive learning module</span>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.06em] text-[#123C32]">Paycheck & deduction lab</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#41514A]">
            Understand why take-home pay is lower than gross wages, and how payroll taxes and withholding affect a real paycheck.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.96fr_1.04fr]">
          <div className="panel-surface p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-[#E8EDE7] pb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6F7C74]">Inputs</p>
                <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-[#123C32]">Paycheck details</h2>
              </div>
              <button type="button" onClick={resetForm} className="secondary-btn h-10 px-3 text-[10px] font-bold uppercase tracking-[0.1em]">
                Reset
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <p className="mb-2 text-sm font-semibold text-[#123C32]">Choose a calculation type</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMode("hourly")}
                    className={`h-11 rounded-2xl border text-sm font-bold transition ${
                      mode === "hourly" ? "border-[#123C32] bg-[#123C32] text-white" : "border-[#D9E7DF] bg-[#F7FBF8] text-[#41514A]"
                    }`}
                  >
                    Hourly wage
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("salary")}
                    className={`h-11 rounded-2xl border text-sm font-bold transition ${
                      mode === "salary" ? "border-[#123C32] bg-[#123C32] text-white" : "border-[#D9E7DF] bg-[#F7FBF8] text-[#41514A]"
                    }`}
                  >
                    Fixed gross pay
                  </button>
                </div>
              </div>

              {mode === "hourly" ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#123C32]">Hourly wage</label>
                    <input type="number" min="0" step="0.50" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} className="form-input h-11 px-3 text-sm" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#123C32]">Hours worked</label>
                    <input type="number" min="0" step="1" value={hoursWorked} onChange={(e) => setHoursWorked(e.target.value)} className="form-input h-11 px-3 text-sm" />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#123C32]">Gross pay for this period</label>
                  <input type="number" min="0" step="10" value={grossPay} onChange={(e) => setGrossPay(e.target.value)} className="form-input h-11 px-3 text-sm" />
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#123C32]">Pay frequency</label>
                <select value={payFrequency} onChange={(e) => setPayFrequency(e.target.value)} className="form-input h-11 px-3 text-sm">
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Biweekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#123C32]">Custom federal withholding (optional)</label>
                <input type="number" min="0" step="0.01" value={customFedWithholding} onChange={(e) => setCustomFedWithholding(e.target.value)} placeholder="Leave blank for the educational estimate" className="form-input h-11 px-3 text-sm" />
              </div>

              {validationMessage && (
                <div className="rounded-2xl border border-[#F0D6D6] bg-[#FFF4F4] p-3 text-sm text-[#7A3C3C]">
                  {validationMessage}
                </div>
              )}
            </div>
          </div>

          <div className="panel-surface p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-[#E8EDE7] pb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6F7C74]">Results</p>
                <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-[#123C32]">Estimated paycheck</h2>
              </div>
              <span className="rounded-full bg-[#EAF7F3] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#176B52]">
                Educational estimate
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-[#E8EDE7] bg-[#F9FBFA] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6F7C74]">Gross pay</p>
                <p className="mt-2 text-3xl font-black tracking-[-0.05em] text-[#123C32]">${result.grossPay.toFixed(2)}</p>
              </div>
              <div className="rounded-[1.5rem] border border-[#CDE7D7] bg-[#EAF7F3] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#176B52]">Take-home pay</p>
                <p className="mt-2 text-3xl font-black tracking-[-0.05em] text-[#176B52]">${result.takeHomePay.toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-[#E8EDE7] bg-[#F9FBFA] p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6F7C74]">Deductions</p>
              <div className="mt-4 space-y-3 text-sm text-[#41514A]">
                <div className="flex items-center justify-between border-b border-[#E8EDE7] pb-2">
                  <span>Social Security</span>
                  <strong className="text-[#123C32]">-${result.breakdown.socialSecurity.toFixed(2)}</strong>
                </div>
                <div className="flex items-center justify-between border-b border-[#E8EDE7] pb-2">
                  <span>Medicare</span>
                  <strong className="text-[#123C32]">-${result.breakdown.medicare.toFixed(2)}</strong>
                </div>
                <div className="flex items-center justify-between border-b border-[#E8EDE7] pb-2">
                  <span>Federal withholding</span>
                  <strong className="text-[#123C32]">-${result.breakdown.federalWithholding.toFixed(2)}</strong>
                </div>
                <div className="flex items-center justify-between border-b border-[#E8EDE7] pb-2">
                  <span>State withholding</span>
                  <strong className="text-[#123C32]">-${result.breakdown.stateWithholding.toFixed(2)}</strong>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-bold text-[#123C32]">Total deductions</span>
                  <strong className="text-[#123C32]">-${result.totalDeductions.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-[#E8EDE7] bg-[#F5FAF7] p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#176B52]">What this model explains</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#41514A]">
                {result.educationalNotes.map((note) => (
                  <li key={note} className="flex gap-2"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#176B52]" aria-hidden="true" />{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
