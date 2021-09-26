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
    },
    meta: {
      currentPage: '',
      adminAccessKey: '',
    },
    users: [],
    messages: [],
    errors: {
      nicknameInUse: false,
    },
  },
  getters: {
    [StoreGetter.users](state) {
      return state.users;
    },
    [StoreGetter.isUsernameAvailable](state) {
      return state.errors.nicknameInUse;
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
      console.error(`socket error: ${payload}`);

      switch (payload) {
        case Errors.ERROR_MISSING_NICKNAME:
          break;
        case Errors.ERROR_NICKNAME_IN_USE:
          state.errors.nicknameInUse = true;
          break;
        default:
          break;
      }
    },
    [StoreCommit.createSession](state, payload: User) {
      state.user = { ...payload };

      Router.push({ name: RouteNames.DASHBOARD });
    },
    [StoreCommit.updateNickname](state, payload: string) {
      state.user.username = payload;
    },
    [StoreCommit.updateUsers](state, payload: Users) {
      state.users = payload;
    },
    [StoreCommit.updateCurrentPage](state, payload: string) {
      state.meta.currentPage = payload;
    },
    [StoreCommit.deleteSession](state) {
      state.user = {
        userId: '',
        sessionId: '',
        username: '',
        role: Roles.USER,
      };

      Router.push({ name: RouteNames.HOME });
    },
    [StoreCommit.messageChatJoin](state, payload: User) {
      state.messages.push(
        createAppNotification(`"${payload.username}" joined`)
      );
    },
    [StoreCommit.messageChatLeave](state, payload: User) {
      state.messages.push(createAppNotification(`"${payload.username}" left`));
    },
  },
  actions: {
    [StoreAction.connect]({ state }) {
      ChatSocket.auth = {
        nickname: state.user.username,
      };
      ChatSocket.connect();
    },
    [StoreAction.connectAdmin](_, payload: string) {
      ChatSocket.auth = {
        adminAccessKey: payload,
      };
      ChatSocket.connect();
    },
    [StoreAction.restoreSession]({ state }) {
      const sessionId = state.user.sessionId;
      if (sessionId) {
        ChatSocket.auth = { sessionId };
        ChatSocket.connect();
      }
    },
    [StoreAction.joinChat]() {},
    [StoreAction.kickUser]() {},
    [StoreAction.logOff]() {},
  },
  plugins: [
    createLogger(),
    createChatSocketPlugin(),
    createSessionStoragePlugin(),
  ],
});

export function useStore() {
  return baseUseStore(key);
}
