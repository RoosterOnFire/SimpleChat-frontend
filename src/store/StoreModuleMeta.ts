import { StoreGetters, StoreMutations } from "@/type/TypeEnums"
import { StoreModuleMeta } from "@/type/TypeState"

const ModuleMeta: StoreModuleMeta = {
  state: () => ({
    pageCurrent: "",
  }),
  mutations: {
    [StoreMutations.pageCurrentUpdate](state, payload: string) {
      state.pageCurrent = payload
    },
  },
  actions: {},
  getters: {
    [StoreGetters.pageCurrent](state) {
      return state.pageCurrent
    },
  },
}

export default ModuleMeta
