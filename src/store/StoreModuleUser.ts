/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-empty-pattern */
import {
  Errors,
  Roles,
  StoreActions,
  StoreGetters,
  StoreMutations,
  StatusUser,
} from "@/type/TypeEnums"
import { StoreModuleUser, User, UserData } from "@/type/TypeState"

const ModuleUser: StoreModuleUser = {
  state: () => ({
    status: StatusUser.start,
    data: {
      userId: "",
      sessionId: "",
      username: "",
      role: Roles.USER,
    },
    errors: {
      login: {
        invalidSignIn: false,
      },
      register: {
        nicknameInUse: false,
      },
    },
  }),
  mutations: {
    [StoreMutations.userUpdateStatus](state, payload: StatusUser) {
      state.status = payload
    },
    [StoreMutations.sessionUpdate](state, payload: UserData) {
      state.data = { ...state.data, ...payload }
    },
    [StoreMutations.sessionDelete](state) {
      state.status = StatusUser.pending

      state.data = {
        userId: "",
        sessionId: "",
        username: "",
        role: Roles.USER,
      }

      state.errors = {
        login: { invalidSignIn: false },
        register: { nicknameInUse: false },
      }
    },
    [StoreMutations.resetInvalidSignIn](state) {
      state.errors.login.invalidSignIn = false
    },
    [StoreMutations.errorsUpdate](state, payload: string) {
      state.status = StatusUser.rejected

      switch (payload) {
        case Errors.ERROR_INVALID_SING_IN:
          state.errors.login.invalidSignIn = true
          break

        default:
          break
      }
    },
  },
  actions: {
    [StoreActions.register](
      {},
      payload: { username: string; password: string }
    ) {},
    [StoreActions.sessionRestore]({ state, commit }) {
      if (state.data.sessionId === "") {
        commit(StoreMutations.userUpdateStatus, { status: StatusUser.start })
      } else {
        commit(StoreMutations.userUpdateStatus, { status: StatusUser.pending })
      }
    },
    [StoreActions.userSignIn](
      { commit },
      payload: { username?: string; password?: string } | undefined
    ) {
      if (payload === undefined) {
        commit(StoreMutations.userUpdateStatus, { status: StatusUser.start })
      } else {
        commit(StoreMutations.userUpdateStatus, { status: StatusUser.pending })
      }
    },
    [StoreActions.sessionCreate]({ commit }, payload: User) {
      commit(StoreMutations.userUpdateStatus, StatusUser.fulfilled)
      commit(StoreMutations.sessionUpdate, payload)
    },
    [StoreActions.userLogout]({ commit }) {
      commit(StoreMutations.sessionDelete)
    },
    [StoreActions.errorsAdd]({ state, commit }, payload: Errors) {
      switch (payload) {
        case Errors.ERROR_INVALID_SING_IN:
          state.errors.login.invalidSignIn = true
          break

        case Errors.ERROR_USERNAME_IN_USE:
          state.errors.register.nicknameInUse = true
          break

        default:
          break
      }

      if (state && state.data.sessionId && state.data.userId === "") {
        commit(StoreMutations.sessionDelete)
      }
    },
  },
  getters: {
    [StoreGetters.isCurrentUser]: (state) => (payload: string) => {
      return state.data.userId === payload
    },
    [StoreGetters.hasAccess](state) {
      return !!state.data.sessionId || !!state.data.userId
    },
    [StoreGetters.hasNickname](state) {
      return !!state.data.username
    },
    [StoreGetters.errorsInvalidSignIn](state) {
      return (
        state.status === StatusUser.rejected && state.errors.login.invalidSignIn
      )
    },
  },
}

export default ModuleUser
