import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { InjectionKey } from 'vue';
import { Message, State, Users, User, ChatErrorKind } from '@/type/Data';
import { getUser, saveUser } from '@/store/SessionStorage';
import {
  createMessage,
  createNotification,
  kickUser,
  sendChatJoin,
  sendMessage,
} from '@/helpers/Helpers';
import ChatSocket from '@/store/Socket';
import Router from '@/router/Router';

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
    hasSession(state) {
      return !!state.user.sessionId;
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
      if (payload === 'NICKNAME_IN_USE') {
        state.errors.nicknameInUse = true;
      }
    },
    updateSession(state, payload: User) {
      state.user = { ...payload };

      saveUser(state.user);

      // Router.push({ name: state.userExtra.currentPage });
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
  },
  actions: {
    restoreSession() {
      const sessionId = getUser();

      if (sessionId) {
        ChatSocket.auth = { sessionId: getUser() };
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
