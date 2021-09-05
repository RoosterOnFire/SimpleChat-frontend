import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { InjectionKey } from 'vue';
import { Message, State, Users, User, ChatErrorKind } from '@/type/Data';
import { saveUser } from '@/store/SessionStorage';
import {
  createMessage,
  createNotification,
  sendChatJoin,
  sendMessage,
} from '@/helpers/Helpers';
import ChatSocket from '@/store/ChatSocket';
import Router from '@/router/Router';

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    user: {
      id: '',
      nickname: '',
    },
    users: [],
    messages: [],
    errors: {
      nicknameInUse: false,
    },
  },
  getters: {
    hasId(state) {
      return !!state.user.id;
    },
    hasNickname(state) {
      return !!state.user.nickname;
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
    updateUser(state, payload: string) {
      state.user.id = payload;

      saveUser(state.user);

      Router.push('/chat');
    },
    updateNickname(state, payload: string) {
      state.user.nickname = payload;
    },
    updateUsers(state, payload: Users) {
      state.users = payload;
    },
    notifyChatJoin(state, payload: User) {
      const joinChat = createNotification(`"${payload.nickname}" joined`);
      state.messages.push(joinChat);
    },
    notifyChatLeave(state, payload: User) {
      const joinMessage: Message = createNotification(
        `"${payload.nickname}" left`
      );

      state.messages.push(joinMessage);
    },
  },
  actions: {
    async connect({ state }) {
      const nickname = state.user.nickname;

      ChatSocket.auth = { nickname };
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
  },
});

export function useStore() {
  return baseUseStore(key);
}
