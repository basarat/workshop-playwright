import { test, expect } from '@playwright/test';
import { TodoPage } from './todoPage';

test.beforeEach(async ({ page, request }) => {
  await new TodoPage(page).clearTodosAndVisit(request);
});

test.describe('Clear Completed', () => {
  test('Should be hidden when there are no completed todos', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await expect(todoPage.clearCompleted).not.toBeAttached();
    await todoPage.addTodo('Hello');
    await expect(todoPage.clearCompleted).not.toBeAttached();
  });
  test('Should be visible when there are completed todos', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.addTodo('Hello');
    await todoPage.itemCheckboxByIndex(0).click();
    await expect(todoPage.clearCompleted).toBeVisible();
  });
  test('Clicking it removes completed todos', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.addTodo('Hello');
    await todoPage.itemCheckboxByIndex(0).click();
    await todoPage.clearCompleted.click();
    await expect(todoPage.clearCompleted).not.toBeAttached();
  });
});