import { test, expect } from '../../tests/todo/test';

test.beforeEach(async ({ clearTodosAndVisit }) => {
  await clearTodosAndVisit();
});

test.describe('Counter', () => {
  test('Is not displayed when there are no items', async ({ todoPage }) => {
    await expect(todoPage.todoCount).not.toBeAttached();
  });
  test('Displays the number of active todos in a pluralized form e.g. "0 items left", "1 item left", "2 items left"', async ({
    todoPage,
  }) => {
    await todoPage.addTodo('Hello World');
    await todoPage.addTodo('Again');

    await expect(todoPage.todoCount).toHaveText('2 items left');

    await todoPage.itemCheckboxByIndex(0).click();
    await expect(todoPage.todoCount).toHaveText('1 item left');

    await todoPage.itemCheckboxByIndex(1).click();
    await expect(todoPage.todoCount).toHaveText('0 items left');
  });
});
