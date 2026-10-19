import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[#D9E7DF] bg-[#123C32] text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-white/10 pb-8 md:grid-cols-4">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="brand-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 4.75H13.5L17.25 8.5V18.25C17.25 18.6642 16.9142 19 16.5 19H7C6.58579 19 6.25 18.6642 6.25 18.25V5.5C6.25 5.08579 6.58579 4.75 7 4.75Z" stroke="white" strokeWidth="1.7" strokeLinejoin="round"/>
                  <path d="M13.5 4.75V8.5H17.25" stroke="white" strokeWidth="1.7" strokeLinejoin="round"/>
                  <path d="M9.1 13.2L11.1 15.2L15.3 10.8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="text-lg font-black tracking-[-0.04em] text-white">FirstFile</span>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#DDE9E5]">
              A clear, teen-friendly tax education experience built to explain forms, wages, withholding, and filing basics without jargon.
            </p>
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#B6CFC9]">
              Educational use only • no SSN required
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#DDE9E5]">Explore</h4>
            <ul className="space-y-2 text-sm text-[#EAF7F3]">
              <li><Link href="/" className="transition hover:text-white">Checklist</Link></li>
              <li><Link href="/paycheck" className="transition hover:text-white">Paycheck Lab</Link></li>
              <li><Link href="/practice" className="transition hover:text-white">W-2 Explorer</Link></li>
              <li><Link href="/learn" className="transition hover:text-white">Glossary & Quiz</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#DDE9E5]">Official sources</h4>
            <ul className="space-y-2 text-sm text-[#EAF7F3]">
              <li><a href="https://www.irs.gov/file-your-taxes-for-free" target="_blank" rel="noreferrer" className="transition hover:text-white">IRS Free File</a></li>
              <li><a href="https://www.irs.gov/publications/p17" target="_blank" rel="noreferrer" className="transition hover:text-white">IRS Publication 17</a></li>
              <li><a href="https://www.irs.gov/forms-pubs/about-form-w-2" target="_blank" rel="noreferrer" className="transition hover:text-white">About Form W-2</a></li>
              <li><Link href="/privacy" className="transition hover:text-white">Privacy by design</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 pt-6 text-[11px] text-[#DDE9E5] sm:flex-row">
          <span>FirstFile • Free teen tax education</span>
          <span>Privacy-first learning. No SSNs or tax documents required.</span>
        </div>
      </div>
    </footer>
  );
}
