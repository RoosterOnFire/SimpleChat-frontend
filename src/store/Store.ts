import { InjectionKey } from 'vue';
import {
  createStore,
  useStore as baseUseStore,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  createLogger,
} from 'vuex';
import { actions } from '@/store/StoreActions';
import { getters } from '@/store/StoreGetters';
import { mutations } from '@/store/StoreMutations';
import { State } from '@/type/TypeState';
import { state } from '@/store/StoreState';
import { createPluginChatSocket } from '@/store/StorePluginChatSocket';
import { createPluginRouter } from '@/store/StorePluginRouter';
import { createPluginSessionStorage } from '@/store/StorePluginSessionStorage';
import { Actions, Getters, Mutations } from '@/type/TypeStore';

export const key: InjectionKey<VuexStore<State>> = Symbol();

export const store = createStore<State>({
  actions,
  getters,
  mutations,
  state,
  plugins: [
    createLogger(),
    createPluginChatSocket(),
    createPluginRouter(),
    createPluginSessionStorage(),
  ],
});

export function useAppStore() {
  return baseUseStore(key) as Store;
}

export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};
