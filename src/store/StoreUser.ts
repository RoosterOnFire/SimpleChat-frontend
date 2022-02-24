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
      errors: {
        login: {
          invalidSignIn: false,
        },
        register: {
          nicknameInUse: false,
        },
      },
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
    errorsInvalidSignIn: (state) => {
      return (
        state.status === StatusUser.rejected && state.errors.login.invalidSignIn
      )
    },
  },

  actions: {
    userSignIn(payload: { username?: string; password?: string } | undefined) {
      this.status =
        payload === undefined ? StatusUser.start : StatusUser.pending
    },
    sessionCreate(payload: UserData) {
      this.status = StatusUser.fulfilled

      this.sessionUpdate(payload)

      sessionStorage.setItem(sessionStorageKeys.session, this.data.sessionId)

      this.plugins.router.push({ name: RouteNames.dashboard })
    },
    sessionRestore() {
      this.status =
        this.data.sessionId === "" ? StatusUser.start : StatusUser.pending
    },
    sessionUpdate(payload: UserData) {
      this.data = payload
    },
    sessionDelete() {
      this.status = StatusUser.start

      this.data = {
        userId: "",
        sessionId: "",
        username: "",
        role: Roles.user,
      }

      this.errors = {
        login: { invalidSignIn: false },
        register: { nicknameInUse: false },
      }

      sessionStorage.removeItem(sessionStorageKeys.session)
    },
    resetInvalidSignIn() {
      this.errors.login.invalidSignIn = false
    },
    errorsUpdate(payload: string) {
      this.status = StatusUser.rejected

      switch (payload) {
        case Errors.error_invalid_sing_in:
          this.errors.login.invalidSignIn = true
          break

        default:
          break
      }
    },
    userLogout() {
      this.sessionDelete()

      this.plugins.router.push({ name: RouteNames.home })
    },
    errorsAdd(payload: Errors) {
      switch (payload) {
        case Errors.error_invalid_sing_in:
          this.errors.login.invalidSignIn = true
          break

        case Errors.error_username_in_use:
          this.errors.register.nicknameInUse = true
          break

        default:
          break
      }

      if (this.data.sessionId && this.data.userId === "") {
        this.sessionDelete()
      }
    },
    register(payload: { username: string; password: string }): void {
      console.log("WIP", payload)
    },
  },
})
