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
    <header className="sticky top-0 z-40 border-b border-[#D7E5E0] bg-[#FBFAF8]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FBFAF8]/80">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="FirstFile home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 4.75H13.5L17.25 8.5V18.25C17.25 18.6642 16.9142 19 16.5 19H7C6.58579 19 6.25 18.6642 6.25 18.25V5.5C6.25 5.08579 6.58579 4.75 7 4.75Z" stroke="white" strokeWidth="1.7" strokeLinejoin="round"/>
              <path d="M13.5 4.75V8.5H17.25" stroke="white" strokeWidth="1.7" strokeLinejoin="round"/>
              <path d="M9.1 13.2L11.1 15.2L15.3 10.8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[1.1rem] font-black tracking-[-0.04em] text-[#123C32]">FirstFile</span>
              <span className="rounded-full border border-[#E9DCAF] bg-[#FFF8E7] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#7A5E1F]">
                Learning Lab
              </span>
            </div>
            <p className="hidden text-[11px] text-[#6F7C74] sm:block">Your first tax return. A clearer first step.</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map(({ href, label, key, Icon }) => (
            <Link
              key={key}
              href={href}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-semibold transition-all ${
                activeTab === key
                  ? "bg-[#E8F5EE] text-[#123C32] shadow-sm"
                  : "text-[#41514A] hover:bg-[#F2F7F4] hover:text-[#123C32]"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/" className="hidden rounded-full border border-[#D7E5E0] bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#123C32] transition hover:border-[#B9D6CC] hover:bg-[#F6FAF8] sm:inline-flex">
            Get started
          </Link>
          <button
            type="button"
            className="inline-flex rounded-full border border-[#D7E5E0] bg-white p-2.5 text-[#123C32] md:hidden"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button type="button" className="absolute inset-0 bg-[#123C32]/30" onClick={() => setDrawerOpen(false)} aria-label="Close menu" />
          <aside className="relative h-full w-72 max-w-[82vw] overflow-y-auto bg-white p-5 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="brand-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 4.75H13.5L17.25 8.5V18.25C17.25 18.6642 16.9142 19 16.5 19H7C6.58579 19 6.25 18.6642 6.25 18.25V5.5C6.25 5.08579 6.58579 4.75 7 4.75Z" stroke="white" strokeWidth="1.7" strokeLinejoin="round"/>
                    <path d="M13.5 4.75V8.5H17.25" stroke="white" strokeWidth="1.7" strokeLinejoin="round"/>
                    <path d="M9.1 13.2L11.1 15.2L15.3 10.8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="text-lg font-black text-[#123C32]">FirstFile</span>
              </div>
              <button type="button" className="rounded-full border border-[#D7E5E0] p-2 text-[#123C32]" onClick={() => setDrawerOpen(false)} aria-label="Close navigation menu">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav className="space-y-2">
              {links.map(({ href, label, key, Icon }) => (
                <Link
                  key={key}
                  href={href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${
                    activeTab === key ? "bg-[#E8F5EE] text-[#123C32]" : "text-[#41514A] hover:bg-[#F3F8F5]"
                  }`}
                  onClick={() => setDrawerOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
}
