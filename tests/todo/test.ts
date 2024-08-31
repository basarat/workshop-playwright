import { test as base } from '@playwright/test';
import { TodoPage } from './todoPage';

export const test = base.extend<{
  todoPage: TodoPage;
  clearTodosAndVisit: () => Promise<void>;
}>({
  todoPage: async ({ page, request }, use) => {
    // setup (optional)
    const todoPage = new TodoPage(page);
    // use
    await use(todoPage);
    // teardown (optional)
  },
  clearTodosAndVisit: async ({ page, request }, use) => {
    const clearTodosAndVisit = async () => {
      const todoPage = new TodoPage(page);
      await todoPage.clearTodosAndVisit(request);
    };
    await use(clearTodosAndVisit);
  },
});

export { expect } from '@playwright/test';
