import { ActionTree } from 'vuex';
import { Errors, Roles, StoreActions, StoreMutations } from '@/type/enums';
import { State, User } from '@/type/state';
import { ChatSocket } from '@/store/ChatSocketPlugin';
import { Actions } from '@/type/store';

export const actions: ActionTree<State, State> & Actions = {
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
  [StoreActions.addError]({ state, commit }, payload: Errors) {
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
      commit(StoreMutations.deleteSession);
    }
  },
  [StoreActions.kickUser]() {},
  [StoreActions.createRoom]() {},
  [StoreActions.joinRoom]() {},
  [StoreActions.leaveRoom]() {},
};
