import { expect, test } from "@playwright/test";
import { QUIZ_QUESTIONS } from "../../src/data/quiz.js";

test("onboarding keeps multiple income answers when navigating back", async ({ page }) => {
  await page.goto("/");

  const incomeTypes = [
    "Hourly or salaried wages from a job",
    "Independent work, tutoring, or gig jobs",
    "Online sales or creative side work",
    "Not sure yet / exploring future income",
  ];
  for (const incomeType of incomeTypes) {
    await page.getByRole("checkbox", { name: incomeType }).check();
  }

  await page.getByRole("button", { name: "Next step" }).click();
  await expect(page.getByText("Step 2 of 4")).toBeVisible();
  await page.getByRole("button", { name: "← Previous" }).click();
  for (const incomeType of incomeTypes) {
    await expect(page.getByRole("checkbox", { name: incomeType })).toBeChecked();
  }
  for (let step = 0; step < 3; step += 1) {
    await page.getByRole("button", { name: "Next step" }).click();
  }
  const state = page.getByLabel("State of tax residence (optional)");
  await expect(state).toHaveValue("");
  await state.selectOption("FL");
  await expect(state).toHaveValue("FL");
});

test("finishing the quiz shows real results and saves them to the learning guide", async ({ page }) => {
  await page.goto("/learn?tab=quiz");
  await expect(page.getByRole("heading", { name: "Tax glossary & scenario quiz" })).toBeVisible();

  for (const [index, question] of QUIZ_QUESTIONS.entries()) {
    await expect(page.getByRole("heading", { name: question.question })).toBeVisible();
    await page.getByRole("button", { name: question.options[question.correctIndex] }).click();

    if (index < QUIZ_QUESTIONS.length - 1) {
      await expect(page.getByText("Why this answer works")).toBeVisible();
      await page.getByRole("button", { name: "Next question" }).click();
    }
  }

  await expect(page.getByRole("heading", { name: "5 of 5 correct" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Answer review" })).toBeVisible();
  await page.getByRole("link", { name: "View my personalized guide" }).click();
  await expect(page).toHaveURL(/#questionnaire$/);
  await expect(page.getByText("Latest quiz result")).toBeVisible();
  await expect(page.getByText("5 of 5 correct (100%)")).toBeVisible();
});

test("mock return advances through answers and shows its scored review", async ({ page }) => {
  await page.goto("/practice?tab=mock-return");
  await expect(page.getByText(/Fictional mock return · Step 1 of 4/)).toBeVisible();

  const answers = [
    "$3,250 from Box 1",
    "Federal income tax withheld during the year",
    "Indicate that someone can claim her as a dependent",
    "$195 in this simplified example",
  ];

  for (const [index, answer] of answers.entries()) {
    await page.getByRole("button", { name: answer }).click();
    if (index < answers.length - 1) {
      await page.getByRole("button", { name: "Continue" }).click();
    } else {
      await page.getByRole("button", { name: "See practice results" }).click();
    }
  }

  await expect(page.getByRole("heading", { name: "4 of 4 correct" })).toBeVisible();
  await expect(page.getByText(/not a tax calculation, refund estimate, or filing determination/)).toBeVisible();
});

test("paycheck model uses entered withholding and clearly shows incomplete inputs", async ({ page }) => {
  await page.goto("/paycheck");
  await expect(page.getByText("Not actual take-home pay; federal or state withholding is missing.")).toBeVisible();

  await page.getByLabel(/Federal income tax withheld/).fill("10");
  await page.getByLabel(/State income tax withheld/).fill("4");

  await expect(page.getByText("After entered deductions")).toBeVisible();
  await expect(page.getByText("$281.52")).toBeVisible();

  await page.getByRole("button", { name: "Reset" }).click();
  await expect(page.getByText("Not actual take-home pay; federal or state withholding is missing.")).toBeVisible();
});

test("W-2 fields are selectable and update their explanations", async ({ page }) => {
  await page.goto("/practice");
  await page.getByRole("button", { name: /^Box 1 / }).click();
  await expect(page.getByRole("heading", { name: /Box 1 — Wages, tips, other compensation/ })).toBeVisible();
  await expect(page.getByText(/cannot by itself establish whether a return is required/)).toBeVisible();
});

test("glossary search, categories, and examples are usable", async ({ page }) => {
  await page.goto("/learn");
  await page.getByPlaceholder(/Search for W-2, refund/).fill("1099");
  await expect(page.getByRole("heading", { name: "Form 1099 (1099-NEC / 1099-MISC)" })).toBeVisible();
  await page.getByRole("button", { name: "View example" }).click();
  await expect(page.getByText("If you earned $900 tutoring neighborhood kids or delivering food via an app, you may receive a Form 1099-NEC.")).toBeVisible();
});

test("student scenarios update the personalized checklist", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Math Tutoring & Freelance/ }).click();
  const checklist = page.locator("#questionnaire");
  await expect(checklist.getByLabel("Calculate Total Freelance or Gig Earnings")).toBeVisible();
  await expect(checklist.getByText(/Net earnings of \$400 or more from self-employment/)).toBeVisible();
});