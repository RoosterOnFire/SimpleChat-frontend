import { InjectionKey } from 'vue';
import {
  createStore,
  useStore as baseUseStore,
  Store as VuexStore,
  createLogger,
} from 'vuex';
import { State, User } from '@/type/TypeState';
import createPluginChatSocket from '@/store/StorePluginChatSocket';
import createPluginRouter from '@/store/StorePluginRouter';
import createPluginSessionStorage from '@/store/StorePluginSessionStorage';
import ModuleMeta from '@/Store/StoreModuleMeta';
import ModuleUser from '@/store/StoreModuleUser';
import { StoreActions, StoreGetters, StoreMutations } from '@/type/TypeEnums';
import ModuleRooms from '@/store/StoreModuleRooms';

export const key: InjectionKey<VuexStore<State>> = Symbol();

export const store = createStore<State>({
  state: {},
  getters: {
    [StoreGetters.roomsJoined](state: State) {
      return state.rooms;
    },
  },
  mutations: {
    [StoreMutations.usersUpdate](state: State, payload: User) {
      // state.users = payload;
    },
  },
  actions: {
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
