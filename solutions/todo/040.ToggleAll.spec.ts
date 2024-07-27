import { test, expect } from '@playwright/test';
import { TodoPage } from './todoPage';

test.beforeEach(async ({ page, request }) => {
  await new TodoPage(page).clearTodosAndVisit(request);
});

test.describe('Toggle All', () => {
  test('Should not be visible when there are no todos', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await expect(todoPage.toggleAllCheckbox).not.toBeAttached();
    await todoPage.addTodo('Hello');
    await expect(todoPage.toggleAllCheckbox).toBeAttached();
  });
  test('If any todo is not complete it should not be checked.', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.addTodo('Hello');
    await todoPage.addTodo('World');
    /** When nothing is checked */
    await expect(todoPage.toggleAllCheckbox).not.toBeChecked();
    /** When mixed */
    await todoPage.itemCheckboxByIndex(0).click();
    await expect(todoPage.toggleAllCheckbox).not.toBeChecked();
  });
  // it('When all the todos are checked it should also get checked.', () => {
  //   todoPage.addTodo('Hello');
  //   todoPage.addTodo('World');
  //   todoPage.itemCheckboxByIndex(0).click();
  //   todoPage.itemCheckboxByIndex(1).click();
  //   todoPage.toggleAllCheckbox.should('be.checked');
  // });
  // it('This checkbox toggles all the todos to the same state as itself', () => {
  //   todoPage.addTodo('Hello');
  //   todoPage.addTodo('World');

  //   /** When clicked, If it is not checked, it checks all todos. */
  //   todoPage.toggleAllCheckbox.click();
  //   todoPage.itemCheckboxByIndex(0).should('be.checked');
  //   todoPage.itemCheckboxByIndex(1).should('be.checked');
  //   todoPage.toggleAllCheckbox.should('be.checked');

  //   /** When clicked, If it is checked, it unchecks all todos. */
  //   todoPage.toggleAllCheckbox.click();
  //   todoPage.itemCheckboxByIndex(0).should('not.be.checked');
  //   todoPage.itemCheckboxByIndex(1).should('not.be.checked');
  //   todoPage.toggleAllCheckbox.should('not.be.checked');
  // });
});