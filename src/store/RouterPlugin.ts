import Router from '@/router/Router';
import {
  RouteNames,
  SessionStorageKeys,
  StoreActions,
  StoreGetters,
  StoreMutations,
} from '@/type/enums';
import { State } from '@/type/state';
import { Store } from 'vuex';

export const createRouterPlugin = () => (store: Store<State>) => {
  store.subscribe((mutation, state) => {
    switch (mutation.type) {
      case StoreMutations.updateCurrentPage:
        sessionStorage.setItem(
          SessionStorageKeys.CURRENT_PAGE,
          mutation.payload
        );
        break;
      default:
        break;
    }
  });

  store.subscribeAction({
    after: (action, state) => {
      switch (action.type) {
        case StoreActions.createSession:
          Router.push({ name: RouteNames.DASHBOARD });
          break;
        case StoreActions.logOff:
          Router.push({ name: RouteNames.HOME });
        default:
          break;
      }
    },
  });
};
