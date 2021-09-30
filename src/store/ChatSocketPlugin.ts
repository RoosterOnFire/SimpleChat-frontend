import { io } from 'socket.io-client';
import { Store } from 'vuex';
import { ChatSocketMessages, StoreAction, StoreCommit } from '@/type/enums';
import { Message, State, User, Users } from '@/type/state';

export const ChatSocket = io(import.meta.env.VITE_SOCKET_ENDPOINT, {
  autoConnect: false,
});

export function createChatSocketPlugin() {
  return (store: Store<State>) => {
    ChatSocket.onAny((event, ...args) => {
      if (import.meta.env.DEV) {
        console.log('socket event:', event, args);
      }
    });

    ChatSocket.on(ChatSocketMessages.CONNECT_VALID, (payload: User) => {
      store.dispatch(StoreAction.createSession, payload);
    });

    ChatSocket.on(ChatSocketMessages.SESSION_CLOSED, () => {
      store.commit(StoreCommit.deleteSession);
    });

    ChatSocket.on(ChatSocketMessages.USERS_UPDATE, (payload: Users) => {
      store.commit(StoreCommit.updateUsers, payload);
    });

    ChatSocket.on(ChatSocketMessages.CHAT_MESSAGE, (message: Message) => {
      store.commit(StoreCommit.updateMessages, message);
    });

    ChatSocket.on(ChatSocketMessages.CONNECT_ERROR, (err) => {
      store.commit(StoreCommit.addError, err.message);
    });

    store.subscribeAction({
      after: (action, store) => {
        switch (action.type) {
          case StoreAction.joinChat:
            ChatSocket.emit(ChatSocketMessages.CHAT_JOIN, store.user);
            break;
          case StoreAction.addMessage:
            ChatSocket.emit(ChatSocketMessages.CHAT_MESSAGE, action.payload);
            break;
          case StoreAction.kickUser:
            ChatSocket.emit(ChatSocketMessages.USER_KICK, {
              userId: action.payload,
            });
            break;
          case StoreAction.logOff:
            ChatSocket.emit(ChatSocketMessages.USER_LOGOFF);
            break;
          default:
            break;
        }
      },
    });
  };
}
