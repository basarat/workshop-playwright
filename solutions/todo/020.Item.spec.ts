import { test, expect } from '../../tests/todo/test';
import { TodoPage } from '../../tests/todo/todoPage';

test.beforeEach(async ({ clearTodosAndVisit }) => {
  await clearTodosAndVisit();
});

test.describe('Item', () => {
  test('Starts of unchecked', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.addTodo('Hello World');
    await expect(todoPage.itemCheckboxByIndex(0)).not.toBeChecked();
  });

  test('Clicking the checkbox toggles the todo active/complete', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.addTodo('Hello World');
    await todoPage.itemCheckboxByIndex(0).click();
    await expect(todoPage.itemCheckboxByIndex(0)).toBeChecked();
    await todoPage.itemCheckboxByIndex(0).click();
    await expect(todoPage.itemCheckboxByIndex(0)).not.toBeChecked();
  });

  test('Clicking the remove button should remove it item', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.addTodo('Hello World');
    await todoPage.itemDestroyByIndex(0).dispatchEvent("click");
    await expect(todoPage.itemLabelByIndex(0)).not.toBeVisible();
  });
});
