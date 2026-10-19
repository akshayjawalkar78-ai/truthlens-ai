'use client';
import { AppShell } from "../../components/AppShell.jsx";
import { OFFICIAL_RESOURCES } from "../../data/resources.js";

export default function ResourcesPage() {
  return (
    <AppShell activeTab="resources">
      <div className="space-y-8">
        <div className="rounded-[2rem] border border-[#D9E7DF] bg-[#F7FBF8] p-6 shadow-soft sm:p-8">
          <span className="section-kicker">Verified directory</span>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.06em] text-[#123C32]">Official filing & government resources</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#41514A]">
            Start with trustworthy, official sources when you need the current rules, forms, or filing guidance for your situation.
          </p>
        </div>

        <div className="space-y-4">
          {OFFICIAL_RESOURCES.map((res) => (
            <article key={res.id} className="panel-surface p-5 sm:p-6">
              <div className="flex flex-col gap-3 border-b border-[#E8EDE7] pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-black tracking-[-0.03em] text-[#123C32]">{res.title}</h2>
                  <span className="rounded-full bg-[#EAF7F3] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#176B52]">
                    {res.category}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6F7C74]">Reviewed: {res.lastReviewed}</span>
              </div>

              <p className="mt-4 text-base leading-7 text-[#41514A]">{res.description}</p>

              <div className="mt-4 rounded-[1.25rem] border border-[#E8EDE7] bg-[#F8FBF9] p-4 text-sm leading-6 text-[#41514A]">
                <span className="font-bold text-[#123C32]">Why it matters:</span> {res.whyYouNeedIt}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6F7C74]">Valid for: {res.taxYear}</span>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-btn h-11 px-5 text-sm"
                >
                  Visit official source ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
