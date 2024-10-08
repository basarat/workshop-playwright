import { test, expect } from '../../tests/todo/test';

test.beforeEach(async ({ clearTodosAndVisit }) => {
  await clearTodosAndVisit();
});

test.describe('Routing', () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.addTodo('Completed');
    await todoPage.itemCheckboxByIndex(0).click();

    await todoPage.addTodo('Active');
  });

  test('"#/" (default) - all items are shown. The all link is selected', async ({ todoPage }) => {
    await todoPage.expectTodos(['Completed', 'Active']);
    await expect(todoPage.routeAll).toHaveClass(todoPage.classNames.selectedRoute);
  });
  test('"#/active" - Only active items are shown. The active link is selected', async ({ todoPage }) => {
    await todoPage.goto('active');
    await todoPage.expectTodos(['Active']);
    await expect(todoPage.routeActive).toHaveClass(todoPage.classNames.selectedRoute);
  });
  test('"#/completed" - Only completed items are shown. The completed link is selected', async ({ todoPage }) => {
    await todoPage.goto('completed');
    await todoPage.expectTodos(['Completed']);
    await expect(todoPage.routeCompleted).toHaveClass(todoPage.classNames.selectedRoute);
  });
  test('"#/active" - Items should move out if checked', async ({ todoPage }) => {
    await todoPage.goto('active');
    await todoPage.itemCheckboxByIndex(0).click();
    await expect(todoPage.itemLabelByIndex(0)).not.toBeAttached();
    await todoPage.expectTodos([]);
  });
  test('"#/completed" - Items should move out if unchecked', async ({ todoPage }) => {
    await todoPage.goto('completed');
    await todoPage.itemCheckboxByIndex(0).click();
    await expect(todoPage.itemLabelByIndex(0)).not.toBeAttached();
    await todoPage.expectTodos([]);
  });
});
