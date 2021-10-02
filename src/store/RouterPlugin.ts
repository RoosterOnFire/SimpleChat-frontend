import Router from '@/router/Router';
import { RouteNames, StoreActions } from '@/type/enums';
import { State } from '@/type/state';
import { Store } from 'vuex';

export const createRouterPlugin = () => (store: Store<State>) => {
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
