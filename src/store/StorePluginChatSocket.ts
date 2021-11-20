import { io } from 'socket.io-client';
import { Store } from 'vuex';
import {
  ChatSocketMessages,
  StoreActions,
  StoreMutations,
} from '@/type/TypeEnums';
import { Message, State, User, Users } from '@/type/TypeState';

type CallbackPayload = {
  success: boolean;
  message: string;
  data: { name: string };
};

const ChatSocket = io(import.meta.env.VITE_SOCKET_ENDPOINT, {
  autoConnect: false,
});

const createPluginChatSocket = () => {
  return (store: Store<State>) => {
    ChatSocket.onAny((event, ...args) => {
      if (import.meta.env.DEV) {
        console.log('socket event:', event, args);
      }
    });

    ChatSocket.on(ChatSocketMessages.SESSION_CLOSED, () => {
      store.commit(StoreMutations.sessionDelete);
    });

    ChatSocket.on(ChatSocketMessages.USERS_UPDATE, (payload: Users) => {
      store.commit(StoreMutations.usersUpdate, payload);
    });

    ChatSocket.on(ChatSocketMessages.CHAT_MESSAGE, (message: Message) => {
      store.commit(StoreMutations.messagesUpdate, message);
    });

    ChatSocket.on(ChatSocketMessages.CONNECT_ERROR, (err) => {
      store.dispatch(StoreActions.errorsAdd, err.message);
    });

    store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case StoreMutations.messageCreate:
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
                  store.dispatch(StoreActions.sessionCreate, payload.data);
                } else {
                  console.log(payload);
                }
              }
            );
            break;
          case StoreActions.signIn:
            ChatSocket.auth = { sessionId: state.user?.sessionId };

            ChatSocket.connect();

            ChatSocket.emit(
              ChatSocketMessages.CONNECT_SIGNIN,
              {
                username: action.payload?.username || '',
                password: action.payload?.password || '',
              },
              (payload: { success: boolean; data?: User; error?: string }) => {
                if (payload.error) {
                  store.commit(StoreMutations.errorsUpdate, payload.error);
                } else {
                  store.dispatch(StoreActions.sessionCreate, payload.data);
                }
              }
            );
            break;
          case StoreActions.roomsCreate:
            ChatSocket.emit(
              ChatSocketMessages.ROOMS_CREATE,
              { roomName: action.payload },
              (payload: CallbackPayload) => {
                store.commit(StoreMutations.roomsCreate, {
                  name: action.payload,
                });
              }
            );
            break;
          case StoreActions.roomsJoin:
            ChatSocket.emit(
              ChatSocketMessages.ROOMS_JOIN,
              { roomName: action.payload },
              (payload: CallbackPayload) => {
                if (payload.success) {
                  return store.commit(StoreMutations.roomsJoin, {
                    name: payload.data.name,
                  });
                }

                console.error(payload);
              }
            );
            break;
          case StoreActions.roomsLeave:
            ChatSocket.emit(
              ChatSocketMessages.ROOMS_LEAVE,
              { roomName: action.payload },
              console.log
            );
            break;
          case StoreActions.usersKick:
            ChatSocket.emit(ChatSocketMessages.USER_KICK, {
              userId: action.payload,
            });
            break;
          case StoreActions.logOff:
            ChatSocket.emit(
              ChatSocketMessages.CONNECT_LOGOFF,
              (response: any) => {
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
};

export default createPluginChatSocket;
