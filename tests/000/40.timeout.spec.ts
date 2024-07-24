import { test, expect } from "@playwright/test";

// 📝 skipped as it is designed to fail
test.skip("Page demo", async ({ page }) => {
  /** Can also be set globally using config `timeout` option (ms) */
  test.setTimeout(2 * 1000); // 👀 set timeout to 2 seconds

  // arrange
  await page.goto("https://google.com");

  // act
  const input = page.locator("[title=Searchs]"); // 👀 typo
  await input.fill("playwright"); // 👀 note that the wait (retries) happens here
  await input.press("Enter");

  // assert
  await expect(page).toHaveTitle("playwright - Google Search");
});
