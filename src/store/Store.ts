import { InjectionKey } from "vue"
import {
  createStore,
  useStore as baseUseStore,
  Store as VuexStore,
  createLogger,
} from "vuex"
import { State } from "@/type/TypeState"
import createPluginChatSocket from "@/store/StorePluginChatSocket"
import createPluginRouter from "@/store/StorePluginRouter"
import createPluginsessionStorage from "@/store/StorePluginsessionStorage"
import ModuleMeta from "@/Store/StoreModuleMeta"
import ModuleUser from "@/store/StoreModuleUser"
import { StoreGetters } from "@/type/TypeEnums"
import ModuleRooms from "@/store/StoreModuleRooms"

export const key: InjectionKey<VuexStore<State>> = Symbol()

export const store = createStore<State>({
  state: {},
  getters: {
    [StoreGetters.roomsJoined](state: State) {
      return state.rooms
    },
  },
  mutations: {},
  actions: {},
  modules: {
    user: ModuleUser,
    meta: ModuleMeta,
    rooms: ModuleRooms,
  },
  plugins: [
    createLogger(),
    createPluginChatSocket(),
    createPluginRouter(),
    createPluginsessionStorage(),
  ],
})

export function useAppStore() {
  return baseUseStore(key)
}
