import { expect, test } from "@playwright/test";

test("document organizer stores status only and links to the fictional W-2 lesson", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByText("Explore state tax rules for California")).toHaveCount(0);

  const foundStatus = page.getByRole("button", { name: "Found: Form W-2" });
  await foundStatus.click();
  await expect(foundStatus).toHaveAttribute("aria-pressed", "true");
  await expect.poll(async () => page.evaluate(() =>
    JSON.parse(localStorage.getItem("firstfile-document-organizer"))
  )).toEqual({ "1099": "need", records: "need", w2: "found" });

  await page.reload();
  const restoredStatus = page.getByRole("button", { name: "Found: Form W-2" });
  await expect(restoredStatus).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("link", { name: /Explore a sample W-2/ })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);

  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Reset organizer" }).click();
  await expect(page.getByRole("button", { name: "Still need to check: Form W-2" })).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("link", { name: /Explore a sample W-2/ }).click();
  await expect(page).toHaveURL(/\/practice$/);
  await expect(page.getByRole("heading", { name: "Form W-2 interactive explorer" })).toBeVisible();

  await page.goto("/privacy");
  await expect(page.getByText(/document-organizer status selections/)).toBeVisible();
  await expect(page.getByText(/not documents, amounts, or identifiers/)).toBeVisible();
});
