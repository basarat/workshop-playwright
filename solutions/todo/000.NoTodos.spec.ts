import { test, expect } from '@playwright/test';
import { TodoPage } from './todoPage';

test.beforeEach(async ({ page, request }) => {
  const todoPage = new TodoPage(page);
  await todoPage.clearTodosAndVisit(request);
});

test.describe('No todos', () => {
  test('The main list and footer should be hidden', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await expect(todoPage.main).not.toBeVisible();
    await expect(todoPage.footer).not.toBeVisible();
  });
});
