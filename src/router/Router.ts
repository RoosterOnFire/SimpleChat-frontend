import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/pages/Home.vue';
import Dashboard from '@/pages/Dashboard.vue';
import Chat from '@/pages/Chat.vue';
import Admin from '@/pages/Admin.vue';
import { store } from '@/store/Store';
import { RouteNames } from '@/type/enums';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteNames.HOME,
    component: Home,
  },
  {
    path: '/dashboard',
    name: RouteNames.DASHBOARD,
    component: Dashboard,
    children: [
      {
        path: 'chat',
        name: RouteNames.DASHBOARD_CHAT,
        component: Chat,
        meta: { transition: 'slide-right' },
      },
      {
        path: 'admin',
        name: RouteNames.DASHBOARD_ADMIN,
        component: Admin,
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
  store.commit('updateCurrentPage', to.name);
});

export default Router;
