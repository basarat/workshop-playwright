import { test, expect } from '../../tests/todo/test';

test.beforeEach(async ({ clearTodosAndVisit }) => {
  await clearTodosAndVisit();
});

test.describe('Toggle All', () => {
  test('Should not be visible when there are no todos', async ({ todoPage }) => {
    await expect(todoPage.toggleAllCheckbox).not.toBeAttached();
    await todoPage.addTodo('Hello');
    await expect(todoPage.toggleAllCheckbox).toBeAttached();
  });
  test('If any todo is not complete it should not be checked.', async ({ todoPage }) => {
    await todoPage.addTodo('Hello');
    await todoPage.addTodo('World');
    /** When nothing is checked */
    await expect(todoPage.toggleAllCheckbox).not.toBeChecked();
    /** When mixed */
    await todoPage.itemCheckboxByIndex(0).click();
    await expect(todoPage.toggleAllCheckbox).not.toBeChecked();
  });
  test('When all the todos are checked it should also get checked.', async ({ todoPage }) => {
    await todoPage.addTodo('Hello');
    await todoPage.addTodo('World');
    await todoPage.itemCheckboxByIndex(0).click();
    await todoPage.itemCheckboxByIndex(1).click();
    await expect(todoPage.toggleAllCheckbox).toBeChecked();
  });
  test('This checkbox toggles all the todos to the same state as itself', async ({ todoPage }) => {
    await todoPage.addTodo('Hello');
    await todoPage.addTodo('World');

    /** When clicked, If it is not checked, it checks all todos. */
    await todoPage.toggleAllCheckbox.click();
    await expect(todoPage.itemCheckboxByIndex(0)).toBeChecked();
    await expect(todoPage.itemCheckboxByIndex(1)).toBeChecked();
    await expect(todoPage.toggleAllCheckbox).toBeChecked();

    /** When clicked, If it is checked, it unchecks all todos. */
    await todoPage.toggleAllCheckbox.click();
    await expect(todoPage.itemCheckboxByIndex(0)).not.toBeChecked();
    await expect(todoPage.itemCheckboxByIndex(1)).not.toBeChecked();
    await expect(todoPage.toggleAllCheckbox).not.toBeChecked();
  });
});
