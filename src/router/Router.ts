import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/pages/Home.vue';
import { store } from '@/store/Store';
import { StoreMutations, RouteNames, Roles } from '@/type/TypeEnums';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteNames.HOME,
    component: Home,
    children: [
      {
        path: 'login',
        name: RouteNames.HOME_LOGIN,
        component: () => import('@/pages/HomeLogin.vue'),
      },
      {
        path: 'registration',
        name: RouteNames.HOME_REGISTRATION,
        component: () => import('@/pages/HomeRegistration.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    name: RouteNames.DASHBOARD,
    component: () => import('@/pages/Dashboard.vue'),
    children: [
      {
        path: 'admin',
        name: RouteNames.DASHBOARD_ADMIN,
        component: () => import('@/pages/DashboardAdmin.vue'),
      },
      {
        path: 'chat',
        name: RouteNames.DASHBOARD_CHAT,
        component: () => import('@/pages/DashboardChat.vue'),
      },
      {
        path: 'rooms',
        name: RouteNames.DASHBOARD_ROOMS,
        component: () => import('@/pages/DashboardRooms.vue'),
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
  } else if (
    (from.name === RouteNames.HOME || to.name !== RouteNames.HOME) &&
    !store.getters.hasAccess
  ) {
    if (
      to.name === RouteNames.HOME_LOGIN ||
      to.name === RouteNames.HOME_REGISTRATION
    ) {
      next();
    } else {
      next({ name: RouteNames.HOME });
    }
  } else {
    next();
  }
});

Router.afterEach((to, from, failure) => {
  store.commit(StoreMutations.pageCurrentUpdate, to.name);
});

export default Router;
