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
    await todoPage.goto('active');
    await todoPage.expectTodos(['Active']);
    await expect(todoPage.routeActive).toHaveClass(todoPage.classNames.selectedRoute);
  });
  test('"#/completed" - Only completed items are shown. The completed link is selected', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto('completed');
    await todoPage.expectTodos(['Completed']);
    await expect(todoPage.routeCompleted).toHaveClass(todoPage.classNames.selectedRoute);
  });
  test('"#/active" - Items should move out if checked', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto('active');
    await todoPage.itemCheckboxByIndex(0).click();
    await expect(todoPage.itemLabelByIndex(0)).not.toBeAttached();
    await todoPage.expectTodos([]);
  });
  test('"#/completed" - Items should move out if unchecked', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto('completed');
    await todoPage.itemCheckboxByIndex(0).click();
    await expect(todoPage.itemLabelByIndex(0)).not.toBeAttached();
    await todoPage.expectTodos([]);
  });
});
