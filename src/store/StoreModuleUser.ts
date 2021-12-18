import {
  Errors,
  Roles,
  StoreActions,
  StoreGetters,
  StoreMutations,
} from '@/type/TypeEnums';
import { StoreModuleUser, User, UserData } from '@/type/TypeState';

const ModuleUser: StoreModuleUser = {
  state: () => ({
    data: {
      userId: '',
      sessionId: '',
      username: '',
      role: Roles.USER,
    },
    errors: {
      invalidSignIn: false,
      nicknameInUse: false,
    },
  }),
  mutations: {
    [StoreMutations.sessionUpdate](state, payload: UserData) {
      state.data = { ...state.data, ...payload };
    },
    [StoreMutations.sessionDelete](state) {
      state.data = {
        userId: '',
        sessionId: '',
        username: '',
        role: Roles.USER,
      };

      state.errors = {
        invalidSignIn: false,
        nicknameInUse: false,
      };
    },
    [StoreMutations.resetInvalidSignIn](state) {
      state.errors.invalidSignIn = false;
    },
    [StoreMutations.errorsUpdate](state, payload: string) {
      switch (payload) {
        case Errors.ERROR_INVALID_SING_IN:
          state.errors.invalidSignIn = true;
          break;
        default:
          break;
      }
    },
  },
  actions: {
    [StoreActions.register](
      {},
      payload: { username: string; password: string }
    ) {},
    [StoreActions.signIn](
      {},
      payload: { username?: string; password?: string }
    ) {},
    [StoreActions.sessionCreate]({ commit }, payload: User) {
      commit(StoreMutations.sessionUpdate, payload);
    },
    [StoreActions.logOff]({ commit }) {
      commit(StoreMutations.sessionDelete);
    },
    [StoreActions.errorsAdd]({ state, commit }, payload: Errors) {
      switch (payload) {
        case Errors.ERROR_INVALID_SING_IN:
          state.errors.invalidSignIn = true;
          break;

        case Errors.ERROR_USERNAME_IN_USE:
          state.errors.nicknameInUse = true;
          break;

        default:
          break;
      }

      if (state && state.data.sessionId && state.data.userId === '') {
        commit(StoreMutations.sessionDelete);
      }
    },
  },
  getters: {
    [StoreGetters.isCurrentUser]: (state) => (payload: string) => {
      return state.data.userId === payload;
    },
    [StoreGetters.hasAccess](state) {
      return !!state.data.sessionId || !!state.data.userId;
    },
    [StoreGetters.hasNickname](state) {
      return !!state.data.username;
    },
    [StoreGetters.errorsInvalidSignIn](state) {
      return state.errors.invalidSignIn;
    },
  },
};

export default ModuleUser;
