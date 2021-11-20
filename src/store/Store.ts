import { InjectionKey } from 'vue';
import {
  createStore,
  useStore as baseUseStore,
  Store as VuexStore,
  createLogger,
  Commit,
} from 'vuex';
import { State, User } from '@/type/TypeState';
import createPluginChatSocket from '@/store/StorePluginChatSocket';
import createPluginRouter from '@/store/StorePluginRouter';
import createPluginSessionStorage from '@/store/StorePluginSessionStorage';
import ModuleMeta from '@/Store/StoreModuleMeta';
import ModuleUser from '@/store/StoreModuleUser';
import {
  Errors,
  StoreActions,
  StoreGetters,
  StoreMutations,
} from '@/type/TypeEnums';
import ModuleRooms from '@/store/StoreModuleRooms';

export const key: InjectionKey<VuexStore<State>> = Symbol();

export const store = createStore<State>({
  state: {
    errors: {
      nicknameInUse: false,
      invalidSignIn: false,
    },
  },
  getters: {
    [StoreGetters.errorsInvalidSignIn](state: State) {
      return state.errors.invalidSignIn;
    },
    [StoreGetters.roomsJoined](state: State) {
      return state.rooms;
    },
  },
  mutations: {
    [StoreMutations.usersUpdate](state: State, payload: User) {
      // state.users = payload;
    },
    [StoreMutations.resetInvalidSignIn](state: State) {
      state.errors.invalidSignIn = false;
    },
    [StoreMutations.errorsUpdate](state: State, payload: string) {
      switch (payload) {
        case Errors.ERROR_INVALID_SING_IN:
          state.errors.invalidSignIn = true;
          break;
        default:
          break;
      }
    },
  },
  actions: {
    [StoreActions.errorsAdd](
      { state, commit }: { state: State; commit: Commit },
      payload: Errors
    ) {
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

      if (state && state.user?.sessionId && state.user.userId === '') {
        commit(StoreMutations.sessionDelete);
      }
    },
    [StoreActions.usersKick]() {},
  },
  modules: {
    user: ModuleUser,
    meta: ModuleMeta,
    rooms: ModuleRooms,
  },
  plugins: [
    createLogger(),
    createPluginChatSocket(),
    createPluginRouter(),
    createPluginSessionStorage(),
  ],
});

export function useAppStore() {
  return baseUseStore(key);
}
