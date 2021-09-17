import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/pages/Home.vue';
import Chat from '@/pages/Chat.vue';
import Admin from '@/pages/Admin.vue';
import { store } from '@/store/Store';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { transition: 'slide-left' },
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    meta: { transition: 'slide-right' },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
];

const Router = createRouter({
  history: createWebHashHistory(),
  routes,
});

Router.beforeEach((to, from, next) => {
  if (to.name !== 'Home' && !store.getters.hasSession) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default Router;
