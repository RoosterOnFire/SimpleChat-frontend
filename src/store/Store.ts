import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { InjectionKey } from 'vue';
import { Message, State, Users, User } from '@/type/data';
import {
  clearStorage,
  restoreFromStorage,
  saveToStorage,
} from '@/helpers/SessionStorage';
import {
  createMessage,
  createNotification,
  kickUser,
  logoffUser,
  sendChatJoin,
  sendMessage,
} from '@/helpers/Helpers';
import ChatSocket from '@/helpers/Socket';
import Router from '@/router/Router';
import { Errors, RouteNames } from '@/type/enums';

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    user: {
      userId: '',
      sessionId: '',
      username: '',
      role: 'user',
    },
    userExtra: {
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
    hasAccess(state) {
      return !!state.user.sessionId || !!state.user.userId;
    },
    hasNickname(state) {
      return !!state.user.username;
    },
  },
  mutations: {
    addMessage(state, payload: Message) {
      state.messages.push(payload);
    },
    addError(state, payload: Errors) {
      console.error(`socket error: ${payload}`);

      switch (payload) {
        case Errors.ERROR_MISSING_NICKNAME:
          clearStorage();

          Router.push({ name: RouteNames.HOME });
          break;
        case Errors.ERROR_NICKNAME_IN_USE:
          state.errors.nicknameInUse = true;
          break;
        default:
          break;
      }
    },
    createSession(state, payload: User) {
      state.user = { ...payload };

      saveToStorage(state.user);

      Router.push({ name: RouteNames.DASHBOARD });
    },
    updateNickname(state, payload: string) {
      state.user.username = payload;
    },
    updateUsers(state, payload: Users) {
      state.users = payload;
    },

    updateCurrentPage(state, payload: string) {
      state.userExtra.currentPage = payload;
    },
    deleteSession(state) {
      clearStorage();

      state.user = {
        userId: '',
        sessionId: '',
        username: '',
        role: 'user',
      };

      Router.push({ name: RouteNames.HOME });
    },
    messageChatJoin(state, payload: User) {
      state.messages.push(createNotification(`"${payload.username}" joined`));
    },
    messageChatLeave(state, payload: User) {
      state.messages.push(createNotification(`"${payload.username}" left`));
    },
  },
  actions: {
    connect({ state }) {
      ChatSocket.auth = {
        nickname: state.user.username,
      };
      ChatSocket.connect();
    },
    connectAdmin(_, payload: string) {
      ChatSocket.auth = {
        adminAccessKey: payload,
      };
      ChatSocket.connect();
    },
    restoreSession() {
      const sessionId = restoreFromStorage();

      if (sessionId) {
        ChatSocket.auth = { sessionId: restoreFromStorage() };
        ChatSocket.connect();
      }
    },
    joinChat({ state }) {
      sendChatJoin(state.user);
    },
    addMessage({ state, commit }, payload: string) {
      const newMessage = createMessage(state.user, payload);
      commit('addMessage', newMessage);
      sendMessage(newMessage);
    },
    updateNickname({ state }) {
      sendChatJoin(state.user);
    },
    kickUser(_, payload: string) {
      kickUser(payload);
    },
    logOff() {
      logoffUser();
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}
