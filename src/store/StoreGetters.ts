import { GetterTree } from 'vuex';
import { State } from '@/type/TypeState';
import { StoreGetters } from '@/type/TypeEnums';
import { Getters } from '@/type/TypeStore';

export const getters: GetterTree<State, State> & Getters = {
  [StoreGetters.pageCurrent](state) {
    return state.meta.pageCurrent;
  },
  [StoreGetters.errorsInvalidSignIn](state) {
    return state.errors.invalidSignIn;
  },
  [StoreGetters.isCurrentUser]: (state) => (payload: string) => {
    return state.user.userId === payload;
  },
  [StoreGetters.hasAccess](state) {
    return !!state.user.sessionId || !!state.user.userId;
  },
  [StoreGetters.hasNickname](state) {
    return !!state.user.username;
  },
  [StoreGetters.roomsJoined](state) {
    return state.rooms;
  },
};
