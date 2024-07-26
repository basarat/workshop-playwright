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
  // it('Clear input after adding', () => {
  //   todoPage.newTodoInput.type('Hello world').type('{enter}');
  //   todoPage.newTodoInput.should('have.value', '');
  // });
  // it('`.trim` before adding', () => {
  //   todoPage.newTodoInput.type(' Hello world ').type('{enter}');
  //   todoPage.itemLabelByIndex(0).should('have.text', 'Hello world');
  // });
  // it('Do not create a todo if the result of trim is an empty string', () => {
  //   todoPage.newTodoInput.type('  ').type('{enter}');
  //   todoPage.itemLabelByIndex(0).should('not.exist');
  // });
});
