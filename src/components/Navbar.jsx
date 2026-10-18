import Link from "next/link";

export function Navbar({ activeTab = "" }) {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            F
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-slate-900 tracking-tight">FirstFile</span>
              <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded border border-slate-200">
                Teen Tax Lab
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">Your first tax return, simplified.</p>
          </div>
        </Link>

        <nav className="flex items-center space-x-1 sm:space-x-3 text-xs font-medium text-slate-600">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === "home" ? "bg-slate-100 text-slate-900 font-semibold" : "hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Checklist
          </Link>
          <Link
            href="/paycheck"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === "paycheck" ? "bg-slate-100 text-slate-900 font-semibold" : "hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Paycheck Lab
          </Link>
          <Link
            href="/practice"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === "practice" ? "bg-slate-100 text-slate-900 font-semibold" : "hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Practice Docs
          </Link>
          <Link
            href="/learn"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === "learn" ? "bg-slate-100 text-slate-900 font-semibold" : "hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Glossary & Quiz
          </Link>
          <Link
            href="/resources"
            className={`px-3 py-1.5 rounded-lg transition-colors hidden md:block ${
              activeTab === "resources" ? "bg-slate-100 text-slate-900 font-semibold" : "hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Official Resources
          </Link>
        </nav>
      </div>
    </header>
  );
}
