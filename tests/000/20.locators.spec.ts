import { test, expect } from '@playwright/test';

/**
 * Note: using bing as google is blocked with "are you a robot"
 */
test('Page demo', async ({ page }) => {
  // arrange
  await page.goto('https://bing.com');

  // act
  const input = page.locator('[type=Search]');
  await input.fill('playwright');
  const updatedInput = page.locator('form[role=search]');
  await updatedInput.press('Enter');

  // assert
  await expect(page).toHaveTitle('playwright - Search');
});
