import { test, expect } from '@playwright/test';
import { TodoPage } from '../../tests/todo/todoPage';

test.beforeEach(async ({ page, request }) => {
  await new TodoPage(page).clearTodosAndVisit(request);
});

test.describe('No Todos', () => {
  test('The main list and footer should be hidden', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await expect(todoPage.main).not.toBeVisible();
    await expect(todoPage.footer).not.toBeVisible();
  });
});
