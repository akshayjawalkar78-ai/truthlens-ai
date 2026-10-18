import React from "react";
import Link from "next/link";
import { HomeIcon, PaycheckIcon, PracticeIcon, LearnIcon, ResourcesIcon } from "./icons.jsx";

export function Navbar({ activeTab = "" }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const links = [
    { href: "/", label: "Checklist", key: "home", Icon: HomeIcon },
    { href: "/paycheck", label: "Paycheck Lab", key: "paycheck", Icon: PaycheckIcon },
    { href: "/practice", label: "Practice Docs", key: "practice", Icon: PracticeIcon },
    { href: "/learn", label: "Glossary & Quiz", key: "learn", Icon: LearnIcon },
    { href: "/resources", label: "Official Resources", key: "resources", Icon: ResourcesIcon },
  ];

  return (
    <header className="border-b border-slate-200 bg-primary-500 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 rounded-lg bg-primary-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            F
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-primary-900 tracking-tight">FirstFile</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded border border-amber-200">
                Teen Tax Lab
              </span>
            </div>
            <p className="text-[11px] text-primary-700 hidden sm:block">Your first tax return, simplified.</p>
          </div>
        </Link>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-3 text-xs font-medium text-primary-800">
          {links.map(({ href, label, key, Icon }) => (
            <Link
              key={key}
              href={href}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                activeTab === key
                  ? "bg-amber-100 text-amber-900 font-semibold"
                  : "hover:text-primary-900 hover:bg-primary-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 text-primary-900"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {/* Mobile Drawer */}
        {drawerOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black/30" onClick={() => setDrawerOpen(false)} />
            <aside className="relative w-64 bg-white h-full shadow-lg p-4 overflow-y-auto">
              <button
                className="absolute top-2 right-2 text-primary-900"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close navigation menu"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                  <path d="M6 6l12 12M6 18L18 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <nav className="flex flex-col space-y-2 mt-8 text-primary-800">
                {links.map(({ href, label, key, Icon }) => (
                  <Link
                    key={key}
                    href={href}
                    className={`px-3 py-2 rounded-md flex items-center gap-2 ${
                      activeTab === key ? "bg-amber-100 text-amber-900 font-semibold" : "hover:bg-primary-100"
                    }`}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                ))}
              </nav>
            </aside>
          </div>
        )}
      </div>
    </header>
  );
}
