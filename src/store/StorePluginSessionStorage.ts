import { Store } from "vuex"
import {
  sessionStorageKeys,
  StoreActions,
  StoreMutations,
} from "@/type/TypeEnums"
import { State } from "@/type/TypeState"

const createPluginsessionStorage = () => (store: Store<State>) => {
  store.subscribe((mutation) => {
    switch (mutation.type) {
      case StoreMutations.sessionDelete:
        sessionStorage.removeItem(sessionStorageKeys.session)
        break

      default:
        break
    }
  })

  store.subscribeAction({
    before: (action) => {
      switch (action.type) {
        case StoreActions.sessionRestore:
          if (store.state.user) {
            store.state.user.data.sessionId =
              sessionStorage.getItem(sessionStorageKeys.session) ?? ""
          }
          break

        default:
          break
      }
    },
    after: (action, state) => {
      switch (action.type) {
        case StoreActions.sessionCreate:
          sessionStorage.setItem(
            sessionStorageKeys.session,
            state.user?.data.sessionId ?? ""
          )
          break

        case StoreActions.userLogout:
          sessionStorage.removeItem(sessionStorageKeys.session)
          break

        default:
          break
      }
    },
  })
}

export default createPluginsessionStorage
