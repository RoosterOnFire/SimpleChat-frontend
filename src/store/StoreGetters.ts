import { GetterTree } from 'vuex';
import { State } from '@/type/state';
import { StoreGetters } from '@/type/enums';
import { Getters } from '@/type/store';

export const getters: GetterTree<State, State> & Getters = {
  [StoreGetters.currentpage](state) {
    return state.meta.currentPage;
  },
  [StoreGetters.invalidSignIn](state) {
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
  [StoreGetters.joinedRooms](state) {
    return state.rooms;
  },
};
