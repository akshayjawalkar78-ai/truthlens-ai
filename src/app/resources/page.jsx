import { AppShell } from "../../components/AppShell.jsx";
import { OFFICIAL_RESOURCES } from "../../data/resources.js";

export default function ResourcesPage() {
  return (
    <AppShell activeTab="resources">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Verified Directory
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
            Official Filing & Government Resources
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            FirstFile connects student and first-time filers directly to legitimate, verified government portals. Avoid predatory commercial preparation fees by accessing IRS Free File programs.
          </p>
        </div>

        <div className="space-y-4">
          {OFFICIAL_RESOURCES.map((res) => (
            <div key={res.id} className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{res.title}</h3>
                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {res.category}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Reviewed: {res.lastReviewed}</span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                {res.description}
              </p>

              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-600">
                <strong className="text-slate-800">Why a first-time filer needs it:</strong> {res.whyYouNeedIt}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 font-medium">Valid for: {res.taxYear}</span>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg text-xs transition-colors"
                >
                  Visit Official IRS Portal ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
