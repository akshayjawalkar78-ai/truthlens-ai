import test from "node:test";
import assert from "node:assert/strict";
import { calculatePaycheck } from "./calculator.js";
import { generateChecklist } from "./checklist.js";
import { queryTaxExplanation } from "./taxContent.js";
import { gradeQuiz } from "./quiz.js";

test("calculatePaycheck uses supplied withholding and calculates simplified FICA", () => {
  const result = calculatePaycheck({
    grossPay: 300,
    customFederalWithheld: 15,
    customStateWithheld: 0
  });

  assert.equal(result.grossPay, 300);
  assert.equal(result.breakdown.socialSecurity, 18.6); // 300 * 0.062 = 18.60
  assert.equal(result.breakdown.medicare, 4.35);       // 300 * 0.0145 = 4.35
  assert.equal(result.breakdown.totalFica, 22.95);
  assert.equal(result.breakdown.federalWithholding, 15);
  assert.equal(result.breakdown.stateWithholding, 0);
  assert.equal(result.takeHomePay, 262.05);
});

test("calculatePaycheck does not invent missing federal or state withholding", () => {
  const result = calculatePaycheck({ grossPay: 300 });

  assert.equal(result.breakdown.federalWithholding, null);
  assert.equal(result.breakdown.stateWithholding, null);
  assert.equal(result.takeHomePay, null);
  assert.equal(result.remainingAfterEnteredDeductions, 277.05);
});

test("calculatePaycheck handles negative or invalid gross inputs gracefully", () => {
  const result = calculatePaycheck({
    grossPay: -50,
    payFrequency: "biweekly"
  });

  assert.equal(result.grossPay, 0);
  assert.equal(result.takeHomePay, null);
  assert.equal(result.remainingAfterEnteredDeductions, 0);
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

test("generateChecklist uses state and uncertain answers as learning tasks", () => {
  const checklist = generateChecklist({
    state: "TX",
    incomeTypes: ["not-sure"],
    documents: ["no-docs-yet"],
    dependentStatus: "unsure",
    uncertainties: ["Which tax year applies"],
  });

  const stateItem = checklist.items.find((item) => item.id === "check-state-rules");
  assert.ok(stateItem.title.includes("Texas"));

  const questionsItem = checklist.items.find((item) => item.id === "resolve-open-questions");
  assert.ok(questionsItem.description.includes("Which tax year applies"));
  assert.ok(questionsItem.description.includes("Which documents to expect"));
  assert.ok(questionsItem.description.includes("Whether someone can claim you"));
});

test("queryTaxExplanation retrieves verified offline explanations for dependents and refunds", () => {
  const dependentQuery = queryTaxExplanation("Can I file if my parents claim me as a dependent?");
  assert.equal(dependentQuery.confidenceLabel, "reviewed");
  assert.equal(dependentQuery.mode, "offline");
  assert.ok(dependentQuery.answer.includes("does not by itself prevent you from filing"));

  const refundQuery = queryTaxExplanation("What is a tax refund?");
  assert.ok(refundQuery.answer.includes("payments and refundable credits"));
});

test("gradeQuiz reports correct, incorrect, and unanswered responses accurately", () => {
  const questions = [
    {
      id: "one",
      scenario: "W-2 wages",
      question: "Which form reports employee wages?",
      options: ["Form 1099-NEC", "Form W-2"],
      correctIndex: 1,
      explanation: "Employers report wages on Form W-2.",
      sourceTitle: "About Form W-2",
      sourceUrl: "https://www.irs.gov/forms-pubs/about-form-w-2",
    },
    {
      id: "two",
      scenario: "Refunds",
      question: "What is a tax refund?",
      options: ["A returned overpayment", "A bonus"],
      correctIndex: 0,
      explanation: "A refund returns excess payments.",
      sourceTitle: "IRS Refunds",
      sourceUrl: "https://www.irs.gov/refunds",
    },
  ];

  const result = gradeQuiz(questions, { 0: 1, 1: 1 });

  assert.equal(result.total, 2);
  assert.equal(result.answered, 2);
  assert.equal(result.correct, 1);
  assert.equal(result.percentage, 50);
  assert.equal(result.results[0].selectedAnswer, "Form W-2");
  assert.equal(result.results[0].isCorrect, true);
  assert.equal(result.results[1].selectedAnswer, "A bonus");
  assert.equal(result.results[1].correctAnswer, "A returned overpayment");
  assert.equal(result.results[1].isCorrect, false);
});

test("gradeQuiz handles unanswered questions and empty quizzes", () => {
  const result = gradeQuiz([{
    id: "one",
    scenario: "Wages",
    question: "Which form reports wages?",
    options: ["W-2", "1099"],
    correctIndex: 0,
  }]);

  assert.equal(result.answered, 0);
  assert.equal(result.correct, 0);
  assert.equal(result.percentage, 0);
  assert.equal(result.results[0].selectedAnswer, null);
  assert.equal(gradeQuiz([]).percentage, 0);
});
