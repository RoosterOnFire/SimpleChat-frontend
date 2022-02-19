import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import { RouteNames, sessionStorageKeys } from "@/type/TypeEnums"
import { useUserStore } from "@/store/StoreUser"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: RouteNames.home,
    component: () => import("@/components/PageHome.vue"),
    children: [
      {
        path: "login",
        name: RouteNames.login,
        component: () => import("@/components/PageLogin.vue"),
      },
      {
        path: "registration",
        name: RouteNames.registration,
        component: () => import("@/components/PageRegistration.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    name: RouteNames.dashboard,
    component: () => import("@/components/PageDashboard.vue"),
    children: [
      {
        path: "chat",
        name: RouteNames.dashboard_chat,
        component: () => import("@/components/PageDashboardChat.vue"),
      },
      {
        path: "rooms",
        name: RouteNames.dashboard_rooms,
        component: () => import("@/components/PageDashboardRooms.vue"),
      },
    ],
  },
]

const Router = createRouter({
  history: createWebHashHistory(),
  routes,
})

Router.beforeEach((to, from, next) => {
  const user = useUserStore()

  if (
    (from.name === RouteNames.home || to.name !== RouteNames.home) &&
    !user.hasAccess
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
  const routeName = (to.name as string) || RouteNames.home
  sessionStorage.setItem(sessionStorageKeys.current_page, routeName)
})

export default Router
