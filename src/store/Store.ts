import {
  createStore,
  useStore as baseUseStore,
  Store,
  createLogger,
} from 'vuex';
import { InjectionKey } from 'vue';
import { Message, State, Users, User } from '@/type/state';
import {
  clearSessionId,
  restoreSessionId,
  storeSessionId,
} from '@/helpers/SessionStorage';
import {
  ChatSocket,
  createMessage,
  createNotification,
  kickUser,
  logoffUser,
  sendChatJoin,
  sendMessage,
} from '@/helpers/Helpers';
import ChatSocketPlugin from '@/store/ChatSocketPlugin';
import Router from '@/router/Router';
import {
  Errors,
  Roles,
  RouteNames,
  StoreGetter,
  StoreCommit,
  StoreAction,
} from '@/type/enums';

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
    [StoreGetter.hasAccess](state) {
      return !!state.user.sessionId || !!state.user.userId;
    },
    [StoreGetter.hasNickname](state) {
      return !!state.user.username;
    },
  },
  mutations: {
    [StoreCommit.addMessage](state, payload: Message) {
      state.messages.push(payload);
    },
    [StoreCommit.addError](state, payload: Errors) {
      console.error(`socket error: ${payload}`);

      switch (payload) {
        case Errors.ERROR_MISSING_NICKNAME:
          clearSessionId();

          Router.push({ name: RouteNames.HOME });
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

      storeSessionId(state.user);

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
      clearSessionId();

      state.user = {
        userId: '',
        sessionId: '',
        username: '',
        role: Roles.USER,
      };

      Router.push({ name: RouteNames.HOME });
    },
    [StoreCommit.messageChatJoin](state, payload: User) {
      state.messages.push(createNotification(`"${payload.username}" joined`));
    },
    [StoreCommit.messageChatLeave](state, payload: User) {
      state.messages.push(createNotification(`"${payload.username}" left`));
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
    [StoreAction.restoreSession]() {
      const sessionId = restoreSessionId();

      if (sessionId) {
        ChatSocket.auth = { sessionId };
        ChatSocket.connect();
      }
    },
    [StoreAction.joinChat]({ state }) {
      sendChatJoin(state.user);
    },
    [StoreAction.addMessage]({ state, commit }, payload: string) {
      const newMessage = createMessage(state.user, payload);
      commit(StoreCommit.addMessage, newMessage);
      sendMessage(newMessage);
    },
    [StoreAction.updateNickname]({ state }) {
      sendChatJoin(state.user);
    },
    [StoreAction.kickUser](_, payload: string) {
      kickUser(payload);
    },
    [StoreAction.logOff]() {
      logoffUser();
    },
  },
  plugins: [createLogger(), ChatSocketPlugin(ChatSocket)],
});

export function useStore() {
  return baseUseStore(key);
}
