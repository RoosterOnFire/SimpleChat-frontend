import { Roles, StoreMutations } from '@/type/enums';
import { Message, State, User } from '@/type/state';
import { Mutations } from '@/type/store';
import { MutationTree } from 'vuex';

export const mutations: MutationTree<State> & Mutations = {
  [StoreMutations.createRoom](state: State, name: string) {
    state.rooms.push({ name, users: [], messages: [] });
  },
  [StoreMutations.createMessage](state, payload: string) {
    // state.messages.push(createUserMessage(state.user, payload));
  },
  [StoreMutations.updateMessages](state, payload: Message) {
    // state.messages.push(payload);
  },
  [StoreMutations.updateUsername](state, payload: string) {
    state.user.username = payload;
  },
  [StoreMutations.updateUsers](state, payload: User) {
    // state.users = payload;
  },
  [StoreMutations.updateCurrentPage](state, payload: string) {
    state.meta.currentPage = payload;
  },
  [StoreMutations.messageChatJoin](state, payload: User) {
    // state.messages.push(
    //   createAppNotification(`"${payload.username}" joined`)
    // );
  },
  [StoreMutations.messageChatLeave](state, payload: User) {
    // state.messages.push(createAppNotification(`"${payload.username}" left`));
  },
  [StoreMutations.updatePassword](state, payload: string) {
    state.user.password = payload;
  },
  [StoreMutations.resetIsValidSignIn](state) {
    state.errors.invalidSignIn = false;
  },
  [StoreMutations.deleteSession](state) {
    state.user = {
      userId: '',
      sessionId: '',
      username: '',
      role: Roles.USER,
      password: '',
    };
  },
  [StoreMutations.updateSession](state, payload: User) {
    state.user = { ...state.user, ...payload };
  },
};
