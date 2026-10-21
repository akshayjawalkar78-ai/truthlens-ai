import test from "node:test";
import assert from "node:assert/strict";
import { generateChecklist } from "./checklist.js";
import { queryTaxExplanation } from "./taxContent.js";

test("self-employment explainer distinguishes net earnings from gross payments", () => {
  const result = queryTaxExplanation("How does self-employment tax work for a tutor?");

  assert.match(result.answer, /92\.35%/);
  assert.match(result.answer, /not to gross payments/i);
  assert.match(result.sourceUrl, /^https:\/\/www\.irs\.gov\//);
});

test("checklist uses the W-2 lesson directly and avoids a stale Free File threshold", () => {
  const { items } = generateChecklist({
    taxYear: "2025",
    incomeTypes: ["w2-wages"],
    documents: ["w2"],
    dependentStatus: "yes",
    multipleIncome: "no",
    state: "",
    uncertainties: [],
  });
  const w2Task = items.find(({ id }) => id === "gather-w2");
  const freeFileTask = items.find(({ id }) => id === "use-irs-free-file");

  assert.equal(w2Task.actionLink, "/practice");
  assert.doesNotMatch(freeFileTask.description, /\$89,000/);
  assert.match(freeFileTask.description, /filing season/i);
});
