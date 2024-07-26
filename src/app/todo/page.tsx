'use client';

import { useEffect, useRef } from 'react';
import { classNames } from './todomvc.styles';
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
      <section className={classNames.app}>
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
    <header className={classNames.header}>
      <h1>todos</h1>
      <input
        className={classNames.newTodo}
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
    <section className={classNames.main}>
      <input
        id={classNames.toggleAll}
        className={classNames.toggleAll}
        type="checkbox"
        checked={appState.everythingIsCompleted}
        onChange={() => appState.toggleCompleteEverything()}
      />
      <label htmlFor={classNames.toggleAll}>Mark all as complete</label>
      <ul className={classNames.todoList}>
        {appState.visibleList.map((item, i) => {
          return (
            <li
              key={item.id}
              className={
                item.id === appState.editingId ? classNames.editing : item.completed ? classNames.completed : ''
              }
            >
              <div className={classNames.view}>
                <input
                  data-test={`item-toggle-${i}`}
                  className={classNames.toggle}
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => appState.toggle(item.id)}
                />
                <label data-test={`item-label-${i}`} onDoubleClick={() => appState.setEditing(item)}>
                  {item.message}
                </label>
                <button
                  className={classNames.destroy}
                  data-test={`item-destroy-${i}`}
                  onClick={() => appState.destroy(item.id)}
                />
              </div>
              {appState.editingId && (
                <input
                  data-test={`item-edit-${i}`}
                  className={classNames.edit}
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
    <footer className={classNames.footer}>
      <span className={classNames.todoCount}>
        <strong>{appSnap.activeCount}</strong> {appSnap.activeCount === 1 ? 'item' : 'items'} left
      </span>
      <ul className={classNames.filters}>
        <li>
          <a data-test="all" className={routerSnap.route === 'all' ? classNames.selected : ''} href={link(routes.all)}>
            All
          </a>
          <a
            data-test="active"
            className={routerSnap.route === 'active' ? classNames.selected : ''}
            href={link(routes.active)}
          >
            Active
          </a>
          <a
            data-test="completed"
            className={routerSnap.route === 'completed' ? classNames.selected : ''}
            href={link(routes.completed)}
          >
            Completed
          </a>
        </li>
      </ul>
      {appSnap.completedCount > 0 && (
        <button className={classNames.clearCompleted} onClick={() => appSnap.clearCompleted()}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

const Info = () => {
  return (
    <footer className={classNames.info}>
      <p>Double-click to edit a todo</p>
      <p>
        Created by <a href="http://basarat.com">@basarat</a>
      </p>
    </footer>
  );
};
