import { test, expect } from "@playwright/test";

// 📝 skipped as it is designed to fail
test.skip("Page demo", async ({ page }) => {
  // arrange
  await page.goto("https://google.com");

  // act
  const input = page.locator("[title=Searchs]"); // 👀 typo
  await input.fill("playwright"); // 👀 note that the wait (retries) happens here, notice await
  await input.press("Enter");

  // assert
  await expect(page).toHaveTitle("playwright - Google Search");
});
