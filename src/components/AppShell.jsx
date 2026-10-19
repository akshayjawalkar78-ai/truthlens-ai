import { Navbar } from "./Navbar.jsx";
import { Footer } from "./Footer.jsx";

export function AppShell({ children, activeTab = "" }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar activeTab={activeTab} />
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
