import { Navbar } from "./Navbar.jsx";
import { Footer } from "./Footer.jsx";

export function AppShell({ children, activeTab = "" }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar activeTab={activeTab} />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
