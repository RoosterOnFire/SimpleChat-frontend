import { ActionContext } from 'vuex';
import { Errors, StoreActions, StoreGetters, StoreMutations } from './enums';
import { Message, Rooms, State, User } from './state';

export type Getters = {
  [StoreGetters.currentpage](state: State): string;
  [StoreGetters.hasAccess](state: State): boolean;
  [StoreGetters.hasNickname](state: State): boolean;
  [StoreGetters.isCurrentUser](state: State): (payload: string) => boolean;
  [StoreGetters.isValidSignIn](state: State): boolean;
  [StoreGetters.joinedRooms](state: State): Rooms;
};

export type Mutations = {
  [StoreMutations.createMessage](state: State, payload: string): void;
  [StoreMutations.createMessage](state: State, payload: string): void;
  [StoreMutations.createRoom](state: State, name: string): void;
  [StoreMutations.deleteSession](state: State): void;
  [StoreMutations.messageChatJoin](state: State, payload: User): void;
  [StoreMutations.messageChatLeave](state: State, payload: User): void;
  [StoreMutations.resetIsValidSignIn](state: State): void;
  [StoreMutations.updateCurrentPage](state: State, payload: string): void;
  [StoreMutations.updateMessages](state: State, payload: Message): void;
  [StoreMutations.updateSession](state: State, payload: User): void;
  [StoreMutations.updateUsers](state: State, payload: User): void;
};

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [StoreActions.addError](context: ActionAugments, payload: Errors): void;
  [StoreActions.createRoom](context: ActionAugments): void;
  [StoreActions.createSession](context: ActionAugments, payload: User): void;
  [StoreActions.joinRoom](context: ActionAugments): void;
  [StoreActions.kickUser](context: ActionAugments): void;
  [StoreActions.leaveRoom](context: ActionAugments): void;
  [StoreActions.logOff](context: ActionAugments): void;
  [StoreActions.signIn](
    context: ActionAugments,
    payload: { username: string; password: string }
  ): void;
};
