import { test, expect } from '../../tests/todo/test';
import { TodoPage } from '../../tests/todo/todoPage';

test.beforeEach(async ({ clearTodosAndVisit }) => {
  await clearTodosAndVisit();
});

test.describe('Edit item', () => {
  test.beforeEach(async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.addTodo('Hello');
  });
  test('Double-clicking the todo label activates editing mode', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.itemLabelByIndex(0).dblclick();
    await expect(todoPage.itemEditByIndex(0)).toBeAttached();
  });
  test('The edit mode should exit on enter, blur and escape', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.itemLabelByIndex(0).dblclick();
    await todoPage.itemEditByIndex(0).press('Enter');
    await expect(todoPage.itemEditByIndex(0)).not.toBeAttached();

    await todoPage.itemLabelByIndex(0).dblclick();
    await todoPage.itemEditByIndex(0).blur();
    await expect(todoPage.itemEditByIndex(0)).not.toBeAttached();

    await todoPage.itemLabelByIndex(0).dblclick();
    await todoPage.itemEditByIndex(0).press('Escape');
    await expect(todoPage.itemEditByIndex(0)).not.toBeAttached();
  });
  test('Enter results in a commit', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.itemLabelByIndex(0).dblclick();
    await todoPage.itemEditByIndex(0).pressSequentially(' World');
    await todoPage.itemEditByIndex(0).press('Enter');
    await expect(todoPage.itemLabelByIndex(0)).toHaveText('Hello World');
  });
  test('Blur results in a commit', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.itemLabelByIndex(0).dblclick();
    await todoPage.itemEditByIndex(0).pressSequentially(' World');
    await todoPage.itemEditByIndex(0).blur();
    await expect(todoPage.itemLabelByIndex(0)).toHaveText('Hello World');
  });
  test('The *commit* is done after trim', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.itemLabelByIndex(0).dblclick();
    await todoPage.itemEditByIndex(0).pressSequentially(' World   ');
    await todoPage.itemEditByIndex(0).blur();
    await expect(todoPage.itemLabelByIndex(0)).toHaveText(/^Hello World$/);
  });
  test('If the trim results in an empty value, the commit should destroy the item', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.itemLabelByIndex(0).dblclick();
    await todoPage.itemEditByIndex(0).clear();
    await todoPage.itemEditByIndex(0).blur();
    await expect(todoPage.itemEditByIndex(0)).not.toBeAttached();
  });
  test('Escape does not result in a commit', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.itemLabelByIndex(0).dblclick();
    await todoPage.itemEditByIndex(0).pressSequentially(' World');
    await todoPage.itemEditByIndex(0).press('Escape');
    await expect(todoPage.itemLabelByIndex(0)).toHaveText(/^Hello$/);
  });
});