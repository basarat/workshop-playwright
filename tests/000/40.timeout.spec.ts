import { test, expect } from "@playwright/test";

// 📝 skipped as it is designed to fail
test.skip("Page demo", async ({ page }) => {
  /** 👀 Can also be set globally using config `timeout` option (ms) */
  test.setTimeout(10 * 1000); // 👀 set timeout to 10 seconds

  // arrange
  await page.goto("https://google.com");

  // act
  const input = page.locator("[title=Searchs]"); // 👀 typo
  await input.fill("playwright", { timeout: 2 * 1000 }); // 👀 custom timeout for individual actions
  await input.press("Enter");

  // assert
  await expect(page).toHaveTitle("playwright - Google Search");
});
