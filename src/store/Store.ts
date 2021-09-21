import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { InjectionKey } from 'vue';
import { Message, State, Users, User, ChatErrorKind } from '@/type/Data';
import {
  clearSession,
  restoreSession,
  saveSession,
} from '@/store/SessionStorage';
import {
  createMessage,
  createNotification,
  kickUser,
  sendChatJoin,
  sendMessage,
} from '@/helpers/Helpers';
import ChatSocket from '@/store/Socket';
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
      switch (payload) {
        case ERROR_MISSING_NICKNAME:
          clearSession();

          Router.push({ name: 'Login' });
          break;
        case ERROR_NICKNAME_IN_USE:
          state.errors.nicknameInUse = true;
          break;
        default:
          break;
      }
    },
    updateSession(state, payload: User) {
      state.user = { ...payload };

      saveSession(state.user);

      Router.push({ name: 'Dashboard' });
    },
    updateNickname(state, payload: string) {
      state.user.username = payload;
    },
    updateUsers(state, payload: Users) {
      state.users = payload;
    },
    notifyChatJoin(state, payload: User) {
      const joinChat = createNotification(`"${payload.username}" joined`);

      state.messages.push(joinChat);
    },
    notifyChatLeave(state, payload: User) {
      const joinMessage: Message = createNotification(
        `"${payload.username}" left`
      );

      state.messages.push(joinMessage);
    },
    updateCurrentPage(state, payload: string) {
      state.userExtra.currentPage = payload;
    },
    closeSession(state) {
      state.user = { userId: '', sessionId: '', username: '' };

      clearSession();

      Router.push({ name: 'Login' });
    },
  },
  actions: {
    restoreSession() {
      const sessionId = restoreSession();

      if (sessionId) {
        ChatSocket.auth = { sessionId: restoreSession() };
        ChatSocket.connect();
      }
    },
    connect({ state }) {
      ChatSocket.auth = { nickname: state.user.username };
      ChatSocket.connect();
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
    kickUser({ state }, payload: string) {
      kickUser(payload);
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}
