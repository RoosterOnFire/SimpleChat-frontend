import { SessionStorageKeys, StoreActions, StoreMutations } from '@/type/enums';
import { State } from '@/type/state';
import { Store } from 'vuex';

export const createSessionStoragePlugin = () => (store: Store<State>) => {
  store.subscribe((mutation, state) => {
    switch (mutation.type) {
      case StoreMutations.deleteSession:
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
        case StoreActions.createSession:
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
