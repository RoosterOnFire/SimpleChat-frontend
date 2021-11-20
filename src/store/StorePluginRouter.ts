import { Store } from 'vuex';
import Router from '@/router/Router';
import {
  RouteNames,
  SessionStorageKeys,
  StoreActions,
  StoreMutations,
} from '@/type/TypeEnums';
import { State } from '@/type/TypeState';

const createPluginRouter = () => (store: Store<State>) => {
  store.subscribe((mutation, state) => {
    switch (mutation.type) {
      case StoreMutations.pageCurrentUpdate:
        if (mutation.payload.startsWith('home')) {
          break;
        }

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
          break;
        default:
          break;
      }
    },
  });
};

export default createPluginRouter;
