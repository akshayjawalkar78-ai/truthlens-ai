import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-primary-600 bg-primary-500 py-10 mt-16 text-xs text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100">
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-900 text-sm">FirstFile</span>
              <span className="text-[10px] bg-primary-100 text-primary-700 font-semibold px-2 py-0.5 rounded border border-primary-200">
                Open Educational Tool
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed max-w-sm">
              Helping student workers and first-time filers understand tax withholding, navigate W-2 and 1099 documents, and locate legitimate IRS Free File resources.
            </p>
            <p className="text-[11px] text-slate-400">
              Educational simulation only. Not formal legal, accounting, or tax advice.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-2">Practice & Tools</h4>
            <ul className="space-y-1.5">
              <li><Link href="/" className="hover:text-slate-900">Tax Readiness Questionnaire</Link></li>
              <li><Link href="/paycheck" className="hover:text-slate-900">Paycheck Deduction Lab</Link></li>
              <li><Link href="/practice" className="hover:text-slate-900">Fictional W-2 Explorer</Link></li>
              <li><Link href="/learn" className="hover:text-slate-900">Scenario Quiz</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-2">Government Links</h4>
            <ul className="space-y-1.5">
              <li><a href="https://www.irs.gov/file-your-taxes-for-free" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">IRS Free File</a></li>
              <li><a href="https://www.irs.gov/publications/p17" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">IRS Publication 17</a></li>
              <li><a href="https://www.irs.gov/publications/p501" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">IRS Publication 501 (Dependents)</a></li>
              <li><Link href="/privacy" className="hover:text-slate-900">Privacy by Design</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <span>FirstFile • Free Teen Tax Education</span>
          <span>Privacy Guaranteed: No SSNs or actual tax documents collected.</span>
        </div>
      </div>
    </footer>
  );
}
