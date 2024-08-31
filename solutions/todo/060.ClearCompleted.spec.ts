import { test, expect } from '../../tests/todo/test';

test.beforeEach(async ({ clearTodosAndVisit }) => {
  await clearTodosAndVisit();
});

test.describe('Clear Completed', () => {
  test('Should be hidden when there are no completed todos', async ({ todoPage }) => {
    await expect(todoPage.clearCompleted).not.toBeAttached();
    await todoPage.addTodo('Hello');
    await expect(todoPage.clearCompleted).not.toBeAttached();
  });
  test('Should be visible when there are completed todos', async ({ todoPage }) => {
    await todoPage.addTodo('Hello');
    await todoPage.itemCheckboxByIndex(0).click();
    await expect(todoPage.clearCompleted).toBeVisible();
  });
  test('Clicking it removes completed todos', async ({ todoPage }) => {
    await todoPage.addTodo('Hello');
    await todoPage.itemCheckboxByIndex(0).click();
    await todoPage.clearCompleted.click();
    await expect(todoPage.clearCompleted).not.toBeAttached();
  });
});