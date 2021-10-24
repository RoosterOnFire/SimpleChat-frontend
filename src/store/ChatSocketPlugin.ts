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
      after: (action, state) => {
        switch (action.type) {
          case StoreActions.register:
            ChatSocket.auth = { newUser: true };

            ChatSocket.connect();

            ChatSocket.emit(
              ChatSocketMessages.CONNECT_REGISTRATION,
              {
                username: action.payload?.username || '',
                password: action.payload?.password || '',
              },
              (payload: { success: boolean; data: User }) => {
                if (payload.success) {
                  store.dispatch(StoreActions.createSession, payload.data);
                } else {
                  console.log(payload);
                }
              }
            );
            break;
          case StoreActions.signIn:
            ChatSocket.auth = { sessionId: state.user.sessionId };

            ChatSocket.connect();

            ChatSocket.emit(
              ChatSocketMessages.CONNECT_SIGNIN,
              {
                username: action.payload?.username || '',
                password: action.payload?.password || '',
              },
              (payload: { success: boolean; data?: User; error?: string }) => {
                if (payload.error) {
                  store.commit(StoreMutations.updateErrors, payload.error);
                } else {
                  store.dispatch(StoreActions.createSession, payload.data);
                }
              }
            );
            break;
          case StoreActions.createRoom:
            ChatSocket.emit(
              ChatSocketMessages.ROOMS_CREATE,
              { roomName: action.payload },
              () => {
                store.commit(StoreMutations.createRoom, action.payload);
              }
            );
            break;
          case StoreActions.joinRoom:
            ChatSocket.emit(
              ChatSocketMessages.ROOMS_JOIN,
              { roomName: action.payload },
              console.log
            );
            break;
          case StoreActions.leaveRoom:
            ChatSocket.emit(
              ChatSocketMessages.ROOMS_LEAVE,
              { roomName: action.payload },
              console.log
            );
            break;
          case StoreActions.kickUser:
            ChatSocket.emit(ChatSocketMessages.USER_KICK, {
              userId: action.payload,
            });
            break;
          case StoreActions.logOff:
            ChatSocket.emit(
              ChatSocketMessages.CONNECT_LOGOFF,
              (response: any) => {
                console.log(response);

                ChatSocket.auth = {};
              }
            );
            break;
          default:
            break;
        }
      },
    });
  };
}
