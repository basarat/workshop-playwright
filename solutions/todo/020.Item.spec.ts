import { test, expect } from '@playwright/test';
import { TodoPage } from './todoPage';

test.beforeEach(async ({ page, request }) => {
  await new TodoPage(page).clearTodosAndVisit(request);
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
  // it('Clicking the remove button should remove it item', () => {
  //   todoPage.addTodo('Hello World');
  //   todoPage.itemDestroyByIndex(0).invoke('show').click();
  //   cy.contains('Hello World').should('not.exist');
  // });
});
