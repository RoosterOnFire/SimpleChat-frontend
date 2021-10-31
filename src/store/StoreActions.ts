import { ActionTree } from 'vuex';
import { Errors, Roles, StoreActions, StoreMutations } from '@/type/TypeEnums';
import { State, User } from '@/type/TypeState';
import { Actions } from '@/type/TypeStore';

export const actions: ActionTree<State, State> & Actions = {
  [StoreActions.register](
    { state },
    payload: { username: string; password: string }
  ) {},
  [StoreActions.signIn](
    { state },
    payload: { username?: string; password?: string }
  ) {},
  [StoreActions.sessionCreate]({ state }, payload: User) {
    state.user = { ...state.user, ...payload };
  },
  [StoreActions.logOff]({ state }) {
    state.user = {
      role: Roles.USER,
      sessionId: '',
      userId: '',
      username: '',
    };
  },
  [StoreActions.errorsAdd]({ state, commit }, payload: Errors) {
    switch (payload) {
      case Errors.ERROR_INVALID_SING_IN:
      case Errors.ERROR_MISSING_PASSWORD:
      case Errors.ERROR_MISSING_USERNAME:
        state.errors.invalidSignIn = true;
        break;
      case Errors.ERROR_USERNAME_IN_USE:
        state.errors.nicknameInUse = true;
        break;
      default:
        break;
    }

    if (state.user.sessionId && state.user.userId === '') {
      commit(StoreMutations.sessionDelete);
    }
  },
  [StoreActions.usersKick]() {},
  [StoreActions.roomsCreate]() {},
  [StoreActions.roomsJoin]() {},
  [StoreActions.roomsLeave]() {},
};
