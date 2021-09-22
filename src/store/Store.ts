import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { InjectionKey } from 'vue';
import { Message, State, Users, User, ChatErrorKind } from '@/type/Data';
import {
  clearStorage,
  restoreFromStorage,
  saveToStorage,
} from '@/helpers/SessionStorage';
import {
  logoffUser,
  createMessage,
  createNotification,
  kickUser,
  sendChatJoin,
  sendMessage,
} from '@/helpers/Helpers';
import ChatSocket from '@/helpers/Socket';
import Router from '@/router/Router';
import { ERROR_MISSING_NICKNAME, ERROR_NICKNAME_IN_USE } from '@/type/errors';

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    user: {
      userId: '',
      sessionId: '',
      username: '',
    },
    userExtra: {
      currentPage: '',
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
    addError(state, payload: ChatErrorKind) {
      console.error(`socket error: ${payload}`);

      switch (payload) {
        case ERROR_MISSING_NICKNAME:
          clearStorage();

          Router.push({ name: 'Login' });
          break;
        case ERROR_NICKNAME_IN_USE:
          state.errors.nicknameInUse = true;
          break;
        default:
          break;
      }
    },
    createSession(state, payload: User) {
      state.user = { ...payload };

      saveToStorage(state.user);

      Router.push({ name: 'Dashboard' });
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
      state.user = { userId: '', sessionId: '', username: '' };
      Router.push({ name: 'Login' });
    },
    messageChatJoin(state, payload: User) {
      const joinChat = createNotification(`"${payload.username}" joined`);

      state.messages.push(joinChat);
    },
    messageChatLeave(state, payload: User) {
      const joinMessage: Message = createNotification(
        `"${payload.username}" left`
      );

      state.messages.push(joinMessage);
    },
  },
  actions: {
    connect({ state }) {
      ChatSocket.auth = {
        nickname: state.user.username,
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
