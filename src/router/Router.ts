import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/pages/Home.vue';
import { store } from '@/store/Store';
import { StoreMutations, RouteNames, Roles } from '@/type/enums';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteNames.HOME,
    component: Home,
  },
  {
    path: '/dashboard',
    name: RouteNames.DASHBOARD,
    component: () => import('@/pages/Dashboard.vue'),
    children: [
      {
        path: 'chat',
        name: RouteNames.DASHBOARD_CHAT,
        component: () => import('@/pages/Chat.vue'),
        meta: { transition: 'slide-right' },
      },
      {
        path: 'admin',
        name: RouteNames.DASHBOARD_ADMIN,
        component: () => import('@/pages/Admin.vue'),
        meta: { transition: 'slide-right' },
      },
    ],
  },
];

const Router = createRouter({
  history: createWebHashHistory(),
  routes,
});

Router.beforeEach((to, from, next) => {
  const userRole = store.state.user.role;
  if (to.name === RouteNames.DASHBOARD_ADMIN && userRole !== Roles.ADMIN) {
    return;
  }

  if (
    (from.name === RouteNames.HOME || to.name !== RouteNames.HOME) &&
    !store.getters.hasAccess
  ) {
    next({ name: RouteNames.HOME });
  } else {
    next();
  }
});

Router.afterEach((to, from, failure) => {
  store.commit(StoreMutations.updateCurrentPage, to.name);
});

export default Router;
