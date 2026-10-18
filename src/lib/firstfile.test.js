import test from "node:test";
import assert from "node:assert/strict";
import { calculatePaycheck } from "./calculator.js";
import { generateChecklist } from "./checklist.js";
import { queryTaxExplanation } from "./taxContent.js";

test("calculatePaycheck calculates FICA and take-home pay correctly", () => {
  const result = calculatePaycheck({
    grossPay: 300,
    payFrequency: "biweekly",
    customFederalWithheld: 15,
    customStateWithheld: 0
  });

  assert.equal(result.grossPay, 300);
  assert.equal(result.breakdown.socialSecurity, 18.6); // 300 * 0.062 = 18.60
  assert.equal(result.breakdown.medicare, 4.35);       // 300 * 0.0145 = 4.35
  assert.equal(result.breakdown.totalFica, 22.95);
  assert.equal(result.breakdown.federalWithholding, 15);
  assert.equal(result.breakdown.stateWithholding, 0);
  assert.equal(result.takeHomePay, 262.05); // 300 - 22.95 - 15 - 0 = 262.05
});

test("calculatePaycheck handles negative or invalid inputs gracefully", () => {
  const result = calculatePaycheck({
    grossPay: -50,
    payFrequency: "biweekly"
  });

  assert.equal(result.grossPay, 0);
  assert.equal(result.takeHomePay, 0);
});

test("generateChecklist includes W-2 and dependency guidance for student workers", () => {
  const checklist = generateChecklist({
    taxYear: "2024",
    incomeTypes: ["w2-wages"],
    documents: ["w2"],
    dependentStatus: "yes",
    multipleIncome: "no"
  });

  assert.ok(checklist.items.length >= 4);
  const w2Item = checklist.items.find(i => i.id === "gather-w2");
  assert.ok(w2Item, "Must include W-2 collection guidance");

  const dependentItem = checklist.items.find(i => i.id === "check-dependent-box");
  assert.ok(dependentItem, "Must include dependent checkbox guidance");
});

test("generateChecklist includes self-employment guidance for 1099 freelance workers", () => {
  const checklist = generateChecklist({
    taxYear: "2024",
    incomeTypes: ["freelance-gig"],
    documents: ["1099-nec"],
    dependentStatus: "yes"
  });

  const seItem = checklist.items.find(i => i.id === "tally-1099-income");
  assert.ok(seItem, "Must include self-employment tax guidance");
});

test("queryTaxExplanation retrieves verified offline explanations for dependents and refunds", () => {
  const dependentQuery = queryTaxExplanation("Can I file if my parents claim me as a dependent?");
  assert.equal(dependentQuery.confidenceLabel, "reviewed");
  assert.equal(dependentQuery.mode, "offline");
  assert.ok(dependentQuery.answer.includes("DOES NOT stop you from filing"));

  const refundQuery = queryTaxExplanation("What is a tax refund?");
  assert.ok(refundQuery.answer.includes("returned to you"));
});
