"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "firstfile-document-organizer";
const STATUS_OPTIONS = [
  { value: "need", label: "Still need to check" },
  { value: "found", label: "Found" },
  { value: "not-applicable", label: "Not applicable" },
];

const DOCUMENTS = [
  {
    id: "w2",
    label: "Form W-2",
    applies: "If you were an employee, your employer reports wages and certain tax withheld here.",
    href: "/practice",
    linkLabel: "Explore a sample W-2",
  },
  {
    id: "1099",
    label: "Any applicable 1099 forms",
    applies: "Different 1099 forms report different things. The form alone does not decide whether you must file.",
    href: "/resources",
    linkLabel: "Review official filing guidance",
  },
  {
    id: "records",
    label: "Side-work records",
    applies: "If you worked for yourself, keep a record of income and related expenses—even if no form arrived.",
    href: "/resources#irs-self-employment-tax",
    linkLabel: "Learn about self-employment",
  },
];

function isStatus(value) {
  return STATUS_OPTIONS.some((option) => option.value === value);
}

export function DocumentOrganizer() {
  const [statuses, setStatuses] = useState(() =>
    Object.fromEntries(DOCUMENTS.map(({ id }) => [id, "need"]))
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          setStatuses((current) => Object.fromEntries(
            Object.keys(current).map((id) => [id, isStatus(parsed[id]) ? parsed[id] : current[id]])
          ));
        }
      }
    } catch (error) {
      console.warn("Unable to read saved document organizer statuses", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
    } catch (error) {
      console.warn("Unable to save document organizer statuses", error);
    }
  }, [hydrated, statuses]);

  const updateStatus = (documentId, value) => {
    setStatuses((current) => ({ ...current, [documentId]: value }));
  };

  const resetStatuses = () => {
    if (!window.confirm("Reset the document-status checklist? No documents or personal details are stored.")) return;
    setStatuses(Object.fromEntries(DOCUMENTS.map(({ id }) => [id, "need"])));
  };

  return (
    <section className="field-guide mt-12" aria-labelledby="document-organizer-title">
      <div className="field-guide-header">
        <div>
          <span className="section-kicker">A practical first step</span>
          <h2 id="document-organizer-title" className="field-guide-heading mt-3">
            Keep track, not copies.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#45564C]">
            Use this status-only guide to remember what to look for. Not every item applies to every filer.
            FirstFile never asks you to upload a form or enter its details.
          </p>
        </div>
        <button type="button" onClick={resetStatuses} className="field-guide-reset">
          Reset organizer
        </button>
      </div>

      <div className="field-guide-list">
        {DOCUMENTS.map((document, index) => (
          <article className="field-guide-row" key={document.id}>
            <span className="field-guide-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-[#173F32]">{document.label}</h3>
              <p className="mt-1 text-sm leading-6 text-[#4E5C53]">{document.applies}</p>
              <Link className="field-guide-link" href={document.href}>
                {document.linkLabel} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <fieldset className="field-guide-status">
              <legend className="sr-only">Status for {document.label}</legend>
              {STATUS_OPTIONS.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  aria-pressed={statuses[document.id] === option.value}
                  aria-label={`${option.label}: ${document.label}`}
                  onClick={() => updateStatus(document.id, option.value)}
                >
                  {option.label}
                </button>
              ))}
            </fieldset>
          </article>
        ))}
      </div>
      <p className="field-guide-footnote">
        Only these three status choices are saved in this browser. No tax documents, amounts, or identifiers are collected.
      </p>
    </section>
  );
}
