import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("has title", async ({ page }) => {
    await page.goto("http://web-app:5173/");

    await expect(page).toHaveTitle("Vite + React + TS");
  });

  test("has functional, dynamic-label button", async ({ page }) => {
    await page.goto("http://web-app:5173/");
    const button = page.locator('button:has-text("count is")');

    await expect(button).toHaveText("count is 0");

    await button.click();
    await expect(button).toHaveText("count is 1");

    await button.click();
    await expect(button).toHaveText("count is 2");
  });
});
