import { ActionContext } from 'vuex';
import {
  Errors,
  StoreActions,
  StoreGetters,
  StoreMutations,
} from './TypeEnums';
import { Message, Rooms, State, User } from './TypeState';

export type Getters = {
  [StoreGetters.errorsInvalidSignIn](state: State): boolean;
  [StoreGetters.hasAccess](state: State): boolean;
  [StoreGetters.hasNickname](state: State): boolean;
  [StoreGetters.isCurrentUser](state: State): (payload: string) => boolean;
  [StoreGetters.pageCurrent](state: State): string;
  [StoreGetters.roomsJoined](state: State): Rooms;
};

export type Mutations = {
  [StoreMutations.errorsUpdate](state: State, payload: string): void;
  [StoreMutations.messageChatJoin](state: State, payload: User): void;
  [StoreMutations.messageChatLeave](state: State, payload: User): void;
  [StoreMutations.messageCreate](state: State, payload: string): void;
  [StoreMutations.messagesUpdate](state: State, payload: Message): void;
  [StoreMutations.pageCurrentUpdate](state: State, payload: string): void;
  [StoreMutations.resetInvalidSignIn](state: State): void;
  [StoreMutations.roomsCreate](state: State, payload: { name: string }): void;
  [StoreMutations.roomsJoin](state: State, payload: { name: string }): void;
  [StoreMutations.sessionDelete](state: State): void;
  [StoreMutations.sessionUpdate](state: State, payload: User): void;
  [StoreMutations.usersUpdate](state: State, payload: User): void;
};

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [StoreActions.errorsAdd](context: ActionAugments, payload: Errors): void;
  [StoreActions.logOff](context: ActionAugments): void;
  [StoreActions.roomsCreate](context: ActionAugments): void;
  [StoreActions.roomsJoin](context: ActionAugments): void;
  [StoreActions.roomsLeave](context: ActionAugments): void;
  [StoreActions.sessionCreate](context: ActionAugments, payload: User): void;
  [StoreActions.usersKick](context: ActionAugments): void;
  [StoreActions.signIn](
    context: ActionAugments,
    payload: { username: string; password: string }
  ): void;
  [StoreActions.register](
    context: ActionAugments,
    payload: { username: string; password: string }
  ): void;
};
