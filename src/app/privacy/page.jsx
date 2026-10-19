'use client';
import { AppShell } from "../../components/AppShell.jsx";

const privacyPrinciples = [
  {
    title: "Zero sensitive personal data collected",
    body: "FirstFile does not ask for an SSN, ITIN, full birthdate, bank account credentials, home address, or real tax documents while you explore the learning experience.",
  },
  {
    title: "No real uploads or document processing",
    body: "All W-2 and scenario exercises use fictional information only. Nothing in the practice tools is designed to process your actual tax information.",
  },
  {
    title: "Local browser processing",
    body: "The checklist responses and paycheck calculations run in your browser. The app does not depend on a database or account system to provide the educational experience.",
  },
  {
    title: "Plain-language educational use only",
    body: "This product is designed to teach budgeting and filing basics. It is not a legal filing service or a replacement for official IRS guidance.",
  },
];

export default function PrivacyPage() {
  return (
    <AppShell activeTab="privacy">
      <div className="space-y-8">
        <div className="rounded-[2rem] border border-[#D9E7DF] bg-[#F7FBF8] p-6 shadow-soft sm:p-8">
          <span className="section-kicker">Security & trust</span>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.06em] text-[#123C32]">Privacy by design</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#41514A]">
            FirstFile is built for teens and first-time filers who want to learn tax basics without handing over sensitive information.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[#D9E7DF] bg-white p-6 shadow-soft sm:p-8">
          <div className="grid gap-5">
            {privacyPrinciples.map((item, index) => (
              <div key={item.title} className="rounded-[1.5rem] border border-[#E8EDE7] bg-[#F9FBFA] p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DDF3E7] text-sm font-black text-[#123C32]">
                    {index + 1}
                  </span>
                  <h2 className="text-xl font-black tracking-[-0.03em] text-[#123C32]">{item.title}</h2>
                </div>
                <p className="mt-4 text-base leading-7 text-[#41514A]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
