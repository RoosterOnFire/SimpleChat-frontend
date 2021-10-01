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
import Router from '@/router/Router';
import {
  Errors,
  Roles,
  RouteNames,
  StoreGetter,
  StoreCommit,
  StoreAction,
} from '@/type/enums';
import { createSessionStoragePlugin } from './SessionStoragePlugin';

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
    [StoreGetter.users](state) {
      return state.users;
    },
    [StoreGetter.isValidSignIn](state) {
      return state.errors.invalidSignIn;
    },
    [StoreGetter.isCurrentUser]: (state) => (payload: string) => {
      return state.user.userId === payload;
    },
    [StoreGetter.hasAccess](state) {
      return !!state.user.sessionId || !!state.user.userId;
    },
    [StoreGetter.hasNickname](state) {
      return !!state.user.username;
    },
  },
  mutations: {
    [StoreCommit.addMessage](state, payload: string) {
      state.messages.push(createUserMessage(state.user, payload));
    },
    [StoreCommit.updateMessages](state, payload: Message) {
      state.messages.push(payload);
    },
    [StoreCommit.addError](state, payload: Errors) {
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
    },
    [StoreCommit.updateUsername](state, payload: string) {
      state.user.username = payload;
    },
    [StoreCommit.updateUsers](state, payload: Users) {
      state.users = payload;
    },
    [StoreCommit.updateCurrentPage](state, payload: string) {
      state.meta.currentPage = payload;
    },
    [StoreCommit.messageChatJoin](state, payload: User) {
      state.messages.push(
        createAppNotification(`"${payload.username}" joined`)
      );
    },
    [StoreCommit.messageChatLeave](state, payload: User) {
      state.messages.push(createAppNotification(`"${payload.username}" left`));
    },
    [StoreCommit.updatePassword](state, payload: string) {
      state.user.password = payload;
    },
    [StoreCommit.resetIsValidSignIn](state) {
      state.errors.invalidSignIn = false;
    },
    [StoreCommit.deleteSession](state) {
      state.user = {
        userId: '',
        sessionId: '',
        username: '',
        role: Roles.USER,
        password: '',
      };
    },
    [StoreCommit.updateSession](state, payload: User) {
      state.user = { ...state.user, ...payload };
    },
  },
  actions: {
    [StoreAction.signIn]({ state }) {
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
    [StoreAction.createSession]({ state }, payload: User) {
      state.user = { ...state.user, ...payload };

      Router.push({ name: RouteNames.DASHBOARD });
    },
    [StoreAction.logOff]({ state }) {
      state.user = {
        password: '',
        role: Roles.USER,
        sessionId: '',
        userId: '',
        username: '',
      };

      Router.push({ name: RouteNames.HOME });
    },
    [StoreAction.joinChat]() {},
    [StoreAction.kickUser]() {},
  },
  plugins: [
    createLogger(),
    createChatSocketPlugin(),
    createSessionStoragePlugin(),
  ],
});

export function useAppStore() {
  return baseUseStore(key);
}
