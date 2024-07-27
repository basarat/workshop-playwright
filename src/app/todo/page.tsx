'use client';

import { useEffect, useRef } from 'react';
import { todomvcClassNames } from './todomvc.styles';
import { useAppSnapshot } from './state/appState';
import { routes, link } from './state/routerState';

const Home = () => {
  const appSnap = useAppSnapshot();

  useEffect(() => {
    appSnap.loadItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={todomvcClassNames.app}>
        <Header />
        {appSnap.hasTodos && <Main />}
        {appSnap.hasTodos && <Footer />}
      </section>
      <Info />
    </>
  );
};

export default Home;

const Header: React.FC<{}> = () => {
  const appSnap = useAppSnapshot();

  /** autoFocus not working 🤷🏻‍♂️ */
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <header className={todomvcClassNames.header}>
      <h1>todos</h1>
      <input
        className={todomvcClassNames.newTodo}
        autoFocus={true} /** autoFocus not working 🤷🏻‍♂️ */
        ref={inputRef}
        placeholder="What needs to be done?"
        value={appSnap.current}
        onChange={(e) => appSnap.setCurrent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            appSnap.addCurrentItem();
          }
        }}
      />
    </header>
  );
};

const Main: React.FC<{}> = () => {
  const appState = useAppSnapshot();

  return (
    <section className={todomvcClassNames.main}>
      <input
        id={todomvcClassNames.toggleAll}
        className={todomvcClassNames.toggleAll}
        type="checkbox"
        checked={appState.everythingIsCompleted}
        onChange={() => appState.toggleCompleteEverything()}
      />
      <label htmlFor={todomvcClassNames.toggleAll}>Mark all as complete</label>
      <ul className={todomvcClassNames.todoList}>
        {appState.visibleList.map((item, i) => {
          return (
            <li
              key={item.id}
              className={
                item.id === appState.editingId ? todomvcClassNames.editing : item.completed ? todomvcClassNames.completed : ''
              }
            >
              <div className={todomvcClassNames.view}>
                <input
                  data-test={`item-toggle-${i}`}
                  className={todomvcClassNames.toggle}
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => appState.toggle(item.id)}
                />
                <label data-test={`item-label-${i}`} onDoubleClick={() => appState.setEditing(item)}>
                  {item.message}
                </label>
                <button
                  className={todomvcClassNames.destroy}
                  data-test={`item-destroy-${i}`}
                  onClick={() => appState.destroy(item.id)}
                />
              </div>
              {appState.editingId && (
                <input
                  data-test={`item-edit-${i}`}
                  className={todomvcClassNames.edit}
                  value={appState.editingTodoMessage}
                  onChange={(e) => appState.setEditingTodoMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      appState.submitEditing();
                    } else if (e.keyCode === 27) {
                      appState.cancelEditing();
                    }
                  }}
                  onBlur={() => appState.submitEditing()}
                  autoFocus={true}
                />
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const Footer: React.FC<{}> = () => {
  const appSnap = useAppSnapshot();
  const routerSnap = appSnap.router;
  return (
    <footer className={todomvcClassNames.footer}>
      <span className={todomvcClassNames.todoCount}>
        <strong>{appSnap.activeCount}</strong> {appSnap.activeCount === 1 ? 'item' : 'items'} left
      </span>
      <ul className={todomvcClassNames.filters}>
        <li>
          <a data-test="all" className={routerSnap.route === 'all' ? todomvcClassNames.selected : ''} href={link(routes.all)}>
            All
          </a>
          <a
            data-test="active"
            className={routerSnap.route === 'active' ? todomvcClassNames.selected : ''}
            href={link(routes.active)}
          >
            Active
          </a>
          <a
            data-test="completed"
            className={routerSnap.route === 'completed' ? todomvcClassNames.selected : ''}
            href={link(routes.completed)}
          >
            Completed
          </a>
        </li>
      </ul>
      {appSnap.completedCount > 0 && (
        <button className={todomvcClassNames.clearCompleted} onClick={() => appSnap.clearCompleted()}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

const Info = () => {
  return (
    <footer className={todomvcClassNames.info}>
      <p>Double-click to edit a todo</p>
      <p>
        Created by <a href="http://basarat.com">@basarat</a>
      </p>
    </footer>
  );
};
