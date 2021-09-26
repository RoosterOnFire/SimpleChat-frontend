import { SessionStorageKeys, StoreAction, StoreCommit } from '@/type/enums';
import { State } from '@/type/state';
import { Store } from 'vuex';

export const createSessionStoragePlugin = () => (store: Store<State>) => {
  store.subscribe((mutation, state) => {
    switch (mutation.type) {
      case StoreCommit.createSession:
        sessionStorage.setItem(
          SessionStorageKeys.SESSION,
          state.user.sessionId
        );
        break;
      default:
        break;
    }
  });

  store.subscribeAction({
    before: (action, state) => {
      switch (action.type) {
        case StoreAction.restoreSession:
          state.user.sessionId =
            sessionStorage.getItem(SessionStorageKeys.SESSION) || '';
          break;
        default:
          break;
      }
    },
    after: (action, state) => {
      switch (action.type) {
        case StoreCommit.deleteSession:
          sessionStorage.removeItem(SessionStorageKeys.SESSION);
        default:
          break;
      }
    },
  });
};
