import { TodoItem } from '../../../common/types';
import { getAll, add, setAll } from '../service/todoService';
import { routerProxy } from './routerState';
import { proxyWithComputed } from 'valtio/utils';
import { useSnapshot } from 'valtio';

function createAppProxy() {
  const result = proxyWithComputed({
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
        message: result.current.trim()
      });
      result.current = '';
    },
    toggle(itemId: string) {
      const item = result.items.find(item => item.id === itemId);
      if (item) {
        item.completed = !item.completed;
      }
      setAll({ items: result.items });
    },
    async destroy(itemId: string) {
      result.items = result.items.filter(i => i.id !== itemId);
      setAll({ items: result.items });
    },
    clearCompleted() {
      result.items = result.items.filter(i => i.completed === false);
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
      const todo = result.items.find(i => i.id === result.editingId)!;
      todo.message = result.editingTodoMessage.trim();
      if (todo.message === '') {
        result.items = result.items.filter(item => item.id !== todo.id);
      }
      setAll({ items: result.items });
      result.cancelEditing();
    },
    toggleCompleteEverything() {
      if (result.everythingIsCompleted) {
        result.items.forEach(i => i.completed = false);
      }
      else {
        result.items.forEach(i => i.completed = true);
      }
      setAll({ items: result.items });
    }
  }, {
    hasTodos(snap) {
      return snap.items.length !== 0;
    },
    activeCount(snap) {
      return snap.items.filter(i => i.completed === false).length;
    },
    completedCount(snap) {
      return snap.items.filter(i => i.completed).length;
    },
    visibleList(snap) {
      return snap.router.route === 'all'
        ? snap.items
        : snap.router.route === 'active'
          ? snap.items.filter(i => i.completed === false)
          : snap.items.filter(i => i.completed === true)
    },
    everythingIsCompleted(snap) {
      return !!snap.items.length && snap.items.every(x => x.completed === true);
    },
  });
  return result;
}

const appProxy = createAppProxy();
export const useAppSnapshot = () => useSnapshot(appProxy);
