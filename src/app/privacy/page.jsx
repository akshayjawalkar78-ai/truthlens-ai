import { AppShell } from "../../components/AppShell.jsx";

export default function PrivacyPage() {
  return (
    <AppShell activeTab="privacy">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Security & Trust
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
            Privacy by Design
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            FirstFile is engineered specifically for teenagers and students learning about taxes. We believe financial literacy tools should never collect, store, or transmit your sensitive personal information.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 text-xs text-slate-700 leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Zero Sensitive Personal Data Collected</h2>
            <p>
              FirstFile <strong>never</strong> asks for your Social Security Number (SSN), Individual Taxpayer Identification Number (ITIN), full birthdate, home address, legal full name, or bank account credentials.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. No Real Document Uploads</h2>
            <p>
              We do not allow or accept uploads of your actual Form W-2, Form 1099, or past tax returns. All exercises in the Practice Lab use strictly fictional sample data.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Offline-First Local Processing</h2>
            <p>
              Your questionnaire responses and paycheck calculations run entirely in your local browser using client-side JavaScript. Nothing is saved to a permanent external database or sold to third-party advertisers.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Optional AI Explanations</h2>
            <p>
              If you submit a question through our educational explainer, only the text of your educational query is sent to our server route. No personal identifiers or financial histories are ever attached or logged.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
