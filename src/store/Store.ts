import {
  createStore,
  useStore as baseUseStore,
  Store,
  createLogger,
} from 'vuex';
import { InjectionKey } from 'vue';
import { Message, State, Users, User } from '@/type/state';
import {
  createUserMessage,
  createAppNotification,
} from '@/helpers/createMessages';
import { ChatSocket, createChatSocketPlugin } from '@/store/ChatSocketPlugin';
import {
  Errors,
  Roles,
  StoreGetters,
  StoreMutations,
  StoreActions,
} from '@/type/enums';
import { createSessionStoragePlugin } from './SessionStoragePlugin';
import { createRouterPlugin } from './RouterPlugin';

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    user: {
      userId: '',
      sessionId: '',
      username: '',
      role: Roles.USER,
      password: '',
    },
    meta: {
      currentPage: '',
      adminAccessKey: '',
    },
    users: [],
    messages: [],
    errors: {
      nicknameInUse: false,
      invalidSignIn: false,
    },
  },
  getters: {
    [StoreGetters.users](state) {
      return state.users;
    },
    [StoreGetters.isValidSignIn](state) {
      return state.errors.invalidSignIn;
    },
    [StoreGetters.isCurrentUser]: (state) => (payload: string) => {
      return state.user.userId === payload;
    },
    [StoreGetters.hasAccess](state) {
      return !!state.user.sessionId || !!state.user.userId;
    },
    [StoreGetters.hasNickname](state) {
      return !!state.user.username;
    },
  },
  mutations: {
    [StoreMutations.addMessage](state, payload: string) {
      state.messages.push(createUserMessage(state.user, payload));
    },
    [StoreMutations.updateMessages](state, payload: Message) {
      state.messages.push(payload);
    },
    [StoreMutations.updateUsername](state, payload: string) {
      state.user.username = payload;
    },
    [StoreMutations.updateUsers](state, payload: Users) {
      state.users = payload;
    },
    [StoreMutations.updateCurrentPage](state, payload: string) {
      state.meta.currentPage = payload;
    },
    [StoreMutations.messageChatJoin](state, payload: User) {
      state.messages.push(
        createAppNotification(`"${payload.username}" joined`)
      );
    },
    [StoreMutations.messageChatLeave](state, payload: User) {
      state.messages.push(createAppNotification(`"${payload.username}" left`));
    },
    [StoreMutations.updatePassword](state, payload: string) {
      state.user.password = payload;
    },
    [StoreMutations.resetIsValidSignIn](state) {
      state.errors.invalidSignIn = false;
    },
    [StoreMutations.deleteSession](state) {
      state.user = {
        userId: '',
        sessionId: '',
        username: '',
        role: Roles.USER,
        password: '',
      };
    },
    [StoreMutations.updateSession](state, payload: User) {
      state.user = { ...state.user, ...payload };
    },
  },
  actions: {
    [StoreActions.signIn]({ state }) {
      if (
        state.user.sessionId ||
        (!!state.user.username && !!state.user.password)
      ) {
        ChatSocket.auth = {
          sessionId: state.user.sessionId,
          username: state.user.username,
          password: state.user.password,
        };
        ChatSocket.connect();
      }
    },
    [StoreActions.createSession]({ state }, payload: User) {
      state.user = { ...state.user, ...payload };
    },
    [StoreActions.logOff]({ state }) {
      state.user = {
        password: '',
        role: Roles.USER,
        sessionId: '',
        userId: '',
        username: '',
      };
    },
    [StoreActions.addError]({ state }, payload: Errors) {
      switch (payload) {
        case Errors.ERROR_INVALID_SING_IN:
        case Errors.ERROR_MISSING_PASSWORD:
        case Errors.ERROR_MISSING_USERNAME:
          state.errors.invalidSignIn = true;
          break;
        case Errors.ERROR_NICKNAME_IN_USE:
          state.errors.nicknameInUse = true;
          break;
        default:
          break;
      }

      if (state.user.sessionId && state.user.userId === '') {
        store.commit(StoreMutations.deleteSession);
      }
    },
    [StoreActions.joinChat]() {},
    [StoreActions.kickUser]() {},
  },
  plugins: [
    createLogger(),
    createChatSocketPlugin(),
    createRouterPlugin(),
    createSessionStoragePlugin(),
  ],
});

export function useAppStore() {
  return baseUseStore(key);
}
