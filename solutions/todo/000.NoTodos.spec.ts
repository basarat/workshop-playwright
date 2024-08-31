import { test, expect } from '../../tests/todo/test';

test.describe('No Todos', () => {
  test('The main list and footer should be hidden', async ({ todoPage }) => {
    await expect(todoPage.main).not.toBeVisible();
    await expect(todoPage.footer).not.toBeVisible();
  });
});
