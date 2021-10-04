import { io } from 'socket.io-client';
import { Store } from 'vuex';
import { ChatSocketMessages, StoreActions, StoreMutations } from '@/type/enums';
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
      store.dispatch(StoreActions.createSession, payload);
    });

    ChatSocket.on(ChatSocketMessages.SESSION_CLOSED, () => {
      store.commit(StoreMutations.deleteSession);
    });

    ChatSocket.on(ChatSocketMessages.USERS_UPDATE, (payload: Users) => {
      store.commit(StoreMutations.updateUsers, payload);
    });

    ChatSocket.on(ChatSocketMessages.CHAT_MESSAGE, (message: Message) => {
      store.commit(StoreMutations.updateMessages, message);
    });

    ChatSocket.on(ChatSocketMessages.CONNECT_ERROR, (err) => {
      store.dispatch(StoreActions.addError, err.message);
    });

    store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case StoreMutations.createMessage:
          ChatSocket.emit(ChatSocketMessages.CHAT_MESSAGE, mutation.payload);
          break;
        default:
          break;
      }
    });

    store.subscribeAction({
      after: (action, store) => {
        switch (action.type) {
          case StoreActions.createRoom:
            ChatSocket.emit(ChatSocketMessages.ROOMS_CREATE, {
              roomName: action.payload,
            });
            break;
          case StoreActions.joinRoom:
            ChatSocket.emit(ChatSocketMessages.ROOMS_JOIN, {
              roomName: action.payload,
            });
            break;
          case StoreActions.leaveRoom:
            ChatSocket.emit(ChatSocketMessages.ROOMS_LEAVE, {
              roomName: action.payload,
            });
            break;
          case StoreActions.kickUser:
            ChatSocket.emit(ChatSocketMessages.USER_KICK, {
              userId: action.payload,
            });
            break;
          case StoreActions.logOff:
            ChatSocket.emit(ChatSocketMessages.USER_LOGOFF, console.log);
            break;
          default:
            break;
        }
      },
    });
  };
}
