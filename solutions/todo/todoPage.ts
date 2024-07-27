import { Page, APIRequestContext, expect } from '@playwright/test';
import { todomvcClassNames } from '../../src/app/todo/todomvc.styles';

const pageUrl = 'http://localhost:3000/todo';
const apiUrl = 'http://localhost:3000/todo/api';

export class TodoPage {
  constructor(private readonly page: Page) {}

  async clearTodos(request: APIRequestContext) {
    await request.put(`${apiUrl}/set-all`, { data: { items: [] } });
  }

  async visit() {
    await this.page.goto(pageUrl);
  }

  async clearTodosAndVisit(request: APIRequestContext) {
    await this.clearTodos(request);
    await this.visit();
  }

  get newTodoInput() {
    return this.page.locator('.new-todo');
  }

  get main() {
    return this.page.locator('.main');
  }

  get footer() {
    return this.page.locator('.footer');
  }

  get toggleAllCheckbox() {
    return this.page.locator('.toggle-all');
  }

  get todoCount() {
    return this.page.locator('.todo-count');
  }

  get clearCompleted() {
    return this.page.locator('.clear-completed');
  }

  get routeAll() {
    return this.page.locator('[data-test=all]');
  }

  get routeActive() {
    return this.page.locator('[data-test=active]');
  }

  get routeCompleted() {
    return this.page.locator('[data-test=completed]');
  }

  async goto(route: 'all' | 'active' | 'completed') {
    const hash = route === 'all' ? '' : `#/${route}`;
    return this.page.goto(this.page.url() + hash);
  }

  itemCheckboxByIndex(index: number) {
    return this.page.locator(`[data-test=item-toggle-${index}]`);
  }

  itemLabelByIndex(index: number) {
    return this.page.locator(`[data-test=item-label-${index}]`);
  }
  itemDestroyByIndex(index: number) {
    return this.page.locator(`[data-test=item-destroy-${index}]`);
  }

  itemEditByIndex(index: number) {
    return this.page.locator(`[data-test=item-edit-${index}]`);
  }

  async addTodo(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
    await this.page.waitForResponse(/add/);
    await expect(this.newTodoInput).toHaveValue('');
  }

  classNames = {
    newTodoInput: todomvcClassNames.newTodo,
    selectedRoute: todomvcClassNames.selected,
  };

  async expectTodos(todos: string[]) {
    await expect(this.page.locator('.todo-list label')).toHaveText(todos);
  }
}
