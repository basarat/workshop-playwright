import { test } from "@playwright/test";

test("Page demo", async ({ page }) => {
  // arrange
  await page.goto("https://google.com");
});
