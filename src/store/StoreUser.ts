import { defineStore } from "pinia"
import { RouteNames, storageKeys, StatusUser } from "@/types/TypeEnums"
import { User, UserData } from "@/types/TypeStateUser"
import { Errors, Roles } from "@/types/TypeShared"

export const useUserStore = defineStore("userStore", {
  state: (): User => {
    return {
      status: StatusUser.init,
      data: {
        userId: "",
        token: "",
        username: "",
        role: Roles.user,
      },
      errors: {},
    }
  },

  getters: {
    isCurrentUser: (state) => {
      return (payload: string) => state.data.userId === payload
    },
    hasAccess: (state) => {
      return !!state.data.token || !!state.data.userId
    },
    hasNickname: (state) => {
      return !!state.data.username
    },
    isLoginRejected: (state) => {
      return (
        state.status === StatusUser.rejected &&
        state.errors.error_invalid_sing_in
      )
    },
    isLoading: (state) => {
      return [StatusUser.init, StatusUser.pending].includes(state.status)
    },
  },

  actions: {
    userSignIn(payload: { username?: string; password?: string } | undefined) {
      this.status = payload ? StatusUser.pending : StatusUser.start
    },
    userSignInFulfilled(payload: UserData) {
      this.data = payload

      sessionStorage.setItem(storageKeys.token, this.data.token)

      const storageCurrentpage = sessionStorage.getItem(
        storageKeys.current_page
      )

      let goToRoute
      if (
        storageCurrentpage === null ||
        storageCurrentpage.startsWith("home")
      ) {
        goToRoute = RouteNames.dashboard_rooms
      } else {
        goToRoute = storageCurrentpage
      }

      this.plugins.router
        .push({
          name: goToRoute,
        })
        .then(() => {
          this.status = StatusUser.fulfilled
        })
    },
    userSignInRejected(payload: Errors) {
      this.errors[payload] = true
      this.status = StatusUser.rejected
    },
    sessionRestore() {
      const token = sessionStorage.getItem(storageKeys.token)
      this.status = token ? StatusUser.pending : StatusUser.start
    },
    sessionDelete() {
      this.status = StatusUser.start

      this.data = {
        userId: "",
        token: "",
        username: "",
        role: Roles.user,
      }

      this.errors = {}

      sessionStorage.removeItem(storageKeys.token)
    },
    resetInvalidSignIn() {
      this.errors.error_invalid_sing_in = false
    },
    userLogout() {
      this.sessionDelete()

      this.plugins.router.push({ name: RouteNames.home })
    },
    errorsAdd(payload: Errors) {
      this.errors[payload] = true

      if (this.data.token && this.data.userId === "") {
        this.sessionDelete()
      }
    },
    register(payload: { username: string; password: string }): void {
      console.log("WIP", payload)
    },
  },
})
