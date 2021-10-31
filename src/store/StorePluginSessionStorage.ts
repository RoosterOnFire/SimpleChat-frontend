import {
  SessionStorageKeys,
  StoreActions,
  StoreMutations,
} from '@/type/TypeEnums';
import { State } from '@/type/TypeState';
import { Store } from 'vuex';

export const createPluginSessionStorage = () => (store: Store<State>) => {
  store.subscribe((mutation, state) => {
    switch (mutation.type) {
      case StoreMutations.sessionDelete:
        sessionStorage.removeItem(SessionStorageKeys.SESSION);
      default:
        break;
    }
  });

  store.subscribeAction({
    before: (action, state) => {
      switch (action.type) {
        case StoreActions.signIn:
          store.state.user.sessionId =
            sessionStorage.getItem(SessionStorageKeys.SESSION) ?? '';
          break;
        default:
          break;
      }
    },
    after: (action, state) => {
      switch (action.type) {
        case StoreActions.sessionCreate:
          sessionStorage.setItem(
            SessionStorageKeys.SESSION,
            state.user.sessionId
          );
          break;
        case StoreActions.logOff:
          sessionStorage.removeItem(SessionStorageKeys.SESSION);
        default:
          break;
      }
    },
  });
};
