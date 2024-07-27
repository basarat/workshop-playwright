import { test, expect } from '@playwright/test';
import { TodoPage } from './todoPage';

test.beforeEach(async ({ page, request }) => {
  await new TodoPage(page).clearTodosAndVisit(request);
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
  // it('The edit mode should exit on enter, blur and escape', async ({ page }) => {
  //   const todoPage = new TodoPage(page);
  //   todoPage.itemLabelByIndex(0).dblclick();
  //   todoPage.itemEditByIndex(0).type('{enter}').should('not.exist');

  //   todoPage.itemLabelByIndex(0).dblclick();
  //   todoPage.itemEditByIndex(0).blur().should('not.exist');

  //   todoPage.itemLabelByIndex(0).dblclick();
  //   todoPage.itemEditByIndex(0).type('{esc}').should('not.exist');
  // });
  // it('Enter results in a commit', async ({ page }) => {
  //   const todoPage = new TodoPage(page);
  //   todoPage.itemLabelByIndex(0).dblclick();
  //   todoPage.itemEditByIndex(0).type(' World{enter}');
  //   todoPage.itemLabelByIndex(0).should('have.text', 'Hello World');
  // });
  // it('Blur results in a commit', async ({ page }) => {
  //   const todoPage = new TodoPage(page);
  //   todoPage.itemLabelByIndex(0).dblclick();
  //   todoPage.itemEditByIndex(0).type(' World').blur();
  //   todoPage.itemLabelByIndex(0).should('have.text', 'Hello World');
  // });
  // it('The *commit* is done after trim', async ({ page }) => {
  //   const todoPage = new TodoPage(page);
  //   todoPage.itemLabelByIndex(0).dblclick();
  //   todoPage.itemEditByIndex(0).type(' World ').blur();
  //   todoPage.itemLabelByIndex(0).should('have.text', 'Hello World');
  // });
  // it('If the trim results in an empty value, the commit should destroy the item', async ({ page }) => {
  //   const todoPage = new TodoPage(page);
  //   todoPage.itemLabelByIndex(0).dblclick();
  //   todoPage.itemEditByIndex(0).clear().blur();
  //   todoPage.itemLabelByIndex(0).should('not.exist');
  // });
  // it('Escape does not result in a commit', async ({ page }) => {
  //   const todoPage = new TodoPage(page);
  //   todoPage.itemLabelByIndex(0).dblclick();
  //   todoPage.itemEditByIndex(0).type(' World{esc}');
  //   todoPage.itemLabelByIndex(0).should('have.text', 'Hello');
  // });
});