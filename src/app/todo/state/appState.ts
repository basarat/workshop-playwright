import { TodoItem } from '../../../common/types';
import { getAll, add, setAll } from '../service/todoService';
import { routerProxy } from './routerState';
import { proxy, useSnapshot } from 'valtio';

function createAppProxy() {
  const result = proxy({
    router: routerProxy,
    items: [] as TodoItem[],
    current: '',
    setCurrent: (value: string) => {
      result.current = value;
    },
    editingId: null as string | null,
    editingTodoMessage: '',
    setEditingTodoMessage: (value: string) => {
      result.editingTodoMessage = value;
    },
    async loadItems() {
      const { items } = await getAll();
      result.items = items;
    },
    async addCurrentItem() {
      if (result.current.trim() === '') return;
      const { id } = await add({ message: result.current.trim() });
      result.items.push({
        id,
        completed: false,
        message: result.current.trim(),
      });
      result.current = '';
    },
    toggle(itemId: string) {
      const item = result.items.find((item) => item.id === itemId);
      if (item) {
        item.completed = !item.completed;
      }
      setAll({ items: result.items });
    },
    async destroy(itemId: string) {
      result.items = result.items.filter((i) => i.id !== itemId);
      setAll({ items: result.items });
    },
    clearCompleted() {
      result.items = result.items.filter((i) => i.completed === false);
      setAll({ items: result.items });
    },
    setEditing(item: TodoItem) {
      result.editingId = item.id;
      result.editingTodoMessage = item.message;
    },
    cancelEditing() {
      result.editingId = null;
      result.editingTodoMessage = '';
    },
    submitEditing() {
      const todo = result.items.find((i) => i.id === result.editingId)!;
      todo.message = result.editingTodoMessage.trim();
      if (todo.message === '') {
        result.items = result.items.filter((item) => item.id !== todo.id);
      }
      setAll({ items: result.items });
      result.cancelEditing();
    },
    toggleCompleteEverything() {
      if (result.everythingIsCompleted) {
        result.items.forEach((i) => (i.completed = false));
      } else {
        result.items.forEach((i) => (i.completed = true));
      }
      setAll({ items: result.items });
    },
    get hasTodos() {
      return this.items.length !== 0;
    },
    get activeCount() {
      return this.items.filter((i: TodoItem) => i.completed === false).length;
    },
    get completedCount() {
      return this.items.filter((i: TodoItem) => i.completed).length;
    },
    get visibleList(): TodoItem[] {
      return this.router.route === 'all'
        ? this.items
        : this.router.route === 'active'
        ? this.items.filter((i: TodoItem) => i.completed === false)
        : this.items.filter((i: TodoItem) => i.completed === true);
    },
    get everythingIsCompleted() {
      return !!this.items.length && this.items.every((i: TodoItem) => i.completed === true);
    },
  });
  return result;
}

const appProxy = createAppProxy();
export const useAppSnapshot = () => useSnapshot(appProxy);
