import { test, expect } from '@playwright/test';
import { TodoPage } from './todoPage';

test.beforeEach(async ({ page, request }) => {
  await new TodoPage(page).clearTodosAndVisit(request);
});

test.describe('Routing', () => {
  test.beforeEach(async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.addTodo('Completed');
    await todoPage.itemCheckboxByIndex(0).click();

    await todoPage.addTodo('Active');
  });

  test('"#/" (default) - all items are shown. The all link is selected', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.expectTodos(['Completed', 'Active']);
    await expect(todoPage.routeAll).toHaveClass(todoPage.classNames.selectedRoute);
  });
  test('"#/active" - Only active items are shown. The active link is selected', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await page.goto(page.url() + '#/active');
    await todoPage.expectTodos(['Active']);
    await expect(todoPage.routeActive).toHaveClass(todoPage.classNames.selectedRoute);
  });
  // it('"#/completed" - Only completed items are shown. The completed link is selected', () => {
  //   cy.visit('#/completed');
  //   todoPage.allTodos.should('deep.equal', ['Completed']);
  //   todoPage.routeCompleted.should('have.class', todoPage.classNames.selectedRoute);
  // });
  // it('"#/active" - Items should move out if checked', () => {
  //   cy.visit('#/active');
  //   todoPage.itemCheckboxByIndex(0).click();
  //   todoPage.itemLabelByIndex(0).should('not.exist');
  // });
  // it('"#/completed" - Items should move out if unchecked', () => {
  //   cy.visit('#/completed');
  //   todoPage.itemCheckboxByIndex(0).click();
  //   todoPage.itemLabelByIndex(0).should('not.exist');
  // });
});
