import {
  Roles,
  StoreActions,
  StoreGetters,
  StoreMutations,
} from '@/type/TypeEnums';
import { StoreModuleUser, User } from '@/type/TypeState';

const ModuleUser: StoreModuleUser = {
  state: () => ({
    userId: '',
    sessionId: '',
    username: '',
    role: Roles.USER,
  }),
  mutations: {
    [StoreMutations.sessionUpdate](state, payload: User) {
      if (payload.userId) {
        state.userId = payload.userId;
      }
      if (payload.sessionId) {
        state.sessionId = payload.sessionId;
      }
      if (payload.username) {
        state.username = payload.username;
      }
      if (payload.role) {
        state.role = payload.role;
      }
    },
    [StoreMutations.sessionDelete](state) {
      state.userId = '';
      state.sessionId = '';
      state.username = '';
      state.role = Roles.USER;
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
  },
  getters: {
    [StoreGetters.isCurrentUser]: (state) => (payload: string) => {
      return state.userId === payload;
    },
    [StoreGetters.hasAccess](state) {
      return !!state.sessionId || !!state.userId;
    },
    [StoreGetters.hasNickname](state) {
      return !!state.username;
    },
  },
};

export default ModuleUser;
