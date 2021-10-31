import Router from '@/router/Router';
import {
  RouteNames,
  SessionStorageKeys,
  StoreActions,
  StoreMutations,
} from '@/type/TypeEnums';
import { State } from '@/type/TypeState';
import { Store } from 'vuex';

export const createPluginRouter = () => (store: Store<State>) => {
  store.subscribe((mutation, state) => {
    switch (mutation.type) {
      case StoreMutations.pageCurrentUpdate:
        sessionStorage.setItem(
          SessionStorageKeys.CURRENT_PAGE,
          mutation.payload
        );
        break;
      case StoreMutations.roomsCreate:
      case StoreMutations.roomsJoin:
        Router.push({ name: RouteNames.DASHBOARD_CHAT });
        break;
      default:
        break;
    }
  });

  store.subscribeAction({
    after: (action, state) => {
      switch (action.type) {
        case StoreActions.sessionCreate:
          const pageCurrent = sessionStorage.getItem(
            SessionStorageKeys.CURRENT_PAGE
          );

          if (pageCurrent) {
            Router.push({ name: pageCurrent });
          } else {
            Router.push({ name: RouteNames.DASHBOARD });
          }

          break;
        case StoreActions.logOff:
          Router.push({ name: RouteNames.HOME });
        default:
          break;
      }
    },
  });
};
