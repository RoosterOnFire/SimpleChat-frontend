import { Errors, Roles, StoreMutations } from '@/type/TypeEnums';
import { Message, State, User } from '@/type/TypeState';
import { Mutations } from '@/type/TypeStore';
import { MutationTree } from 'vuex';

export const mutations: MutationTree<State> & Mutations = {
  [StoreMutations.messageCreate](state, payload: string) {
    // state.messages.push(createUserMessage(state.user, payload));
  },
  [StoreMutations.messagesUpdate](state, payload: Message) {
    // state.messages.push(payload);
  },
  [StoreMutations.usersUpdate](state, payload: User) {
    // state.users = payload;
  },
  [StoreMutations.pageCurrentUpdate](state, payload: string) {
    state.meta.pageCurrent = payload;
  },
  [StoreMutations.messageChatJoin](state, payload: User) {
    // state.messages.push(
    //   createAppNotification(`"${payload.username}" joined`)
    // );
  },
  [StoreMutations.messageChatLeave](state, payload: User) {
    // state.messages.push(createAppNotification(`"${payload.username}" left`));
  },
  [StoreMutations.resetInvalidSignIn](state) {
    state.errors.invalidSignIn = false;
  },
  [StoreMutations.sessionDelete](state) {
    state.user = {
      userId: '',
      sessionId: '',
      username: '',
      role: Roles.USER,
    };
  },
  [StoreMutations.sessionUpdate](state, payload: User) {
    state.user = { ...state.user, ...payload };
  },
  [StoreMutations.errorsUpdate](state, payload: string) {
    switch (payload) {
      case Errors.ERROR_INVALID_SING_IN:
        state.errors.invalidSignIn = true;
        break;
      default:
        break;
    }
  },
  [StoreMutations.roomsCreate](state: State, payload: { name: string }) {
    state.meta.chatSelected = payload.name;
  },
  [StoreMutations.roomsJoin](state, payload: { name: string }) {
    state.meta.chatSelected = payload.name;
  },
};
