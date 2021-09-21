import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/pages/Login.vue';
import Dashboard from '@/pages/Dashboard.vue';
import Chat from '@/pages/Chat.vue';
import Admin from '@/pages/Admin.vue';
import { store } from '@/store/Store';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'chat',
        name: 'Chat',
        component: Chat,
        meta: { transition: 'slide-right' },
      },
      {
        path: 'admin',
        name: 'Admin',
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
    (from.name === 'Login' || to.name !== 'Login') &&
    !store.getters.hasAccess
  ) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

Router.afterEach((to, from, failure) => {
  store.commit('updateCurrentPage', to.name);
});

export default Router;
