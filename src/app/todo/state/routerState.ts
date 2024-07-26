import { Router } from 'takeme';
import { link as takeme_link } from 'takeme';
import { proxy } from 'valtio';

export const link = (route: string) => {
  return '/todo/' + takeme_link(route);
};

export const routes = {
  all: '/',
  active: '/active',
  completed: '/completed',
};

export type Routes = 'all' | 'active' | 'completed';

const createRouterProxy = () => {
  const result = proxy({
    route: 'all' as Routes,
    setRoute: (route: Routes) => {
      result.route = route;
    },
  });
  return result;
};

export const routerProxy = createRouterProxy();

new Router([
  {
    $: routes.active,
    enter: () => routerProxy.setRoute('active'),
  },
  {
    $: routes.completed,
    enter: () => routerProxy.setRoute('completed'),
  },
  {
    $: routes.all,
    enter: () => routerProxy.setRoute('all'),
  },
]).init();
