import { test, expect } from '../../tests/todo/test';

test.beforeEach(async ({ clearTodosAndVisit }) => {
  await clearTodosAndVisit();
});

test.describe('New Todo', () => {
  test('The input element should be focused when the page is loaded', async ({ todoPage }) => {
    await expect(todoPage.newTodoInput).toBeFocused();
  });

  test('Created by enter, adding it to the list', async ({ todoPage }) => {
    await todoPage.newTodoInput.fill('Hello World');
    await todoPage.newTodoInput.press('Enter');
    await expect(todoPage.itemLabelByIndex(0)).toContainText('Hello World');
  });

  test('Clear input after adding', async ({ todoPage }) => {
    await todoPage.newTodoInput.fill('Hello World');
    await expect(todoPage.newTodoInput).toHaveValue('Hello World');
    await todoPage.newTodoInput.press('Enter');
    await expect(todoPage.newTodoInput).toHaveValue('');
  });

  test('`.trim` before adding', async ({ todoPage }) => {
    await todoPage.newTodoInput.fill(' Hello World ');
    await todoPage.newTodoInput.press('Enter');
    await expect(todoPage.itemLabelByIndex(0)).toHaveText(/^Hello World$/);
  });

  test('Do not create a todo if the result of trim is an empty string', async ({ todoPage }) => {
    await todoPage.newTodoInput.fill(' ');
    await todoPage.newTodoInput.press('Enter');
    await expect(todoPage.itemLabelByIndex(0)).not.toBeVisible();
  });
});
