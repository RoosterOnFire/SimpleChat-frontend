import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import { store } from "@/store/Store"
import { StoreMutations, RouteNames } from "@/type/TypeEnums"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: RouteNames.home,
    component: () => import("@/pages/Home.vue"),
    children: [
      {
        path: "login",
        name: RouteNames.login,
        component: () => import("@/pages/Login.vue"),
      },
      {
        path: "registration",
        name: RouteNames.registration,
        component: () => import("@/pages/Registration.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    name: RouteNames.DASHBOARD,
    component: () => import("@/pages/Dashboard.vue"),
    children: [
      {
        path: "chat",
        name: RouteNames.DASHBOARD_CHAT,
        component: () => import("@/pages/DashboardChat.vue"),
      },
      {
        path: "rooms",
        name: RouteNames.DASHBOARD_ROOMS,
        component: () => import("@/pages/DashboardRooms.vue"),
      },
    ],
  },
]

const Router = createRouter({
  history: createWebHashHistory(),
  routes,
})

Router.beforeEach((to, from, next) => {
  if (
    (from.name === RouteNames.home || to.name !== RouteNames.home) &&
    !store.getters.hasAccess
  ) {
    if (to.name === RouteNames.login || to.name === RouteNames.registration) {
      next()
    } else {
      next({ name: RouteNames.home })
    }
  } else {
    next()
  }
})

Router.afterEach((to) => {
  store.commit(StoreMutations.pageCurrentUpdate, to.name)
})

export default Router
