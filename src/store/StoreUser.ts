import { defineStore } from "pinia"
import { RouteNames, sessionStorageKeys, StatusUser } from "@/types/TypeEnums"
import { User, UserData } from "@/types/TypeStateUser"
import { Errors, Roles } from "@/types/TypeShared"

export const useUserStore = defineStore("userStore", {
  state: (): User => {
    return {
      status: StatusUser.start,
      data: {
        userId: "",
        sessionId: "",
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
      return !!state.data.sessionId || !!state.data.userId
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
  },

  actions: {
    userSignIn(payload: { username?: string; password?: string } | undefined) {
      this.status =
        payload === undefined ? StatusUser.start : StatusUser.pending
    },
    userSignInFulfilled(payload: UserData) {
      this.status = StatusUser.fulfilled

      this.data = payload

      sessionStorage.setItem(sessionStorageKeys.session, this.data.sessionId)

      this.plugins.router.push({ name: RouteNames.dashboard })
    },
    userSignInRejected(payload: Errors) {
      this.errors[payload] = true
      this.status = StatusUser.rejected
    },
    sessionRestore() {
      this.status =
        this.data.sessionId === "" ? StatusUser.start : StatusUser.pending
    },
    sessionDelete() {
      this.status = StatusUser.start

      this.data = {
        userId: "",
        sessionId: "",
        username: "",
        role: Roles.user,
      }

      this.errors = {}

      sessionStorage.removeItem(sessionStorageKeys.session)
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

      if (this.data.sessionId && this.data.userId === "") {
        this.sessionDelete()
      }
    },
    register(payload: { username: string; password: string }): void {
      console.log("WIP", payload)
    },
  },
})
