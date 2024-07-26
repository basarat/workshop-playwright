import { test, expect } from '@playwright/test';
import { TodoPage } from './todoPage';

test.beforeEach(async ({ page, request }) => {
  await new TodoPage(page).clearTodosAndVisit(request);
});

test.describe('New Todo', () => {
  test('The input element should be focused when the page is loaded', async ({ page }) => {
    await expect(new TodoPage(page).newTodoInput).toBeFocused();
  });

  test('Created by enter, adding it to the list', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.newTodoInput.fill('Hello world');
    await todoPage.newTodoInput.press('Enter');
    await expect(todoPage.itemLabelByIndex(0)).toContainText('Hello world');
  });

  test('Clear input after adding', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.newTodoInput.fill('Hello world');
    await expect(todoPage.newTodoInput).toHaveValue('Hello world');
    await todoPage.newTodoInput.press('Enter');
    await expect(todoPage.newTodoInput).toHaveValue('');
  });

  test('`.trim` before adding', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.newTodoInput.fill(' Hello world ');
    await todoPage.newTodoInput.press('Enter');
    await expect(todoPage.itemLabelByIndex(0)).toHaveText(/^Hello world$/);
  });

  test('Do not create a todo if the result of trim is an empty string', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.newTodoInput.fill(' ');
    await todoPage.newTodoInput.press('Enter');
    await expect(todoPage.itemLabelByIndex(0)).not.toBeVisible();
  });
});
