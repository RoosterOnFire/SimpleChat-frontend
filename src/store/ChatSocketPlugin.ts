import { ChatSocketMessages, StoreCommit } from '@/type/enums';
import { Message, State, User, Users } from '@/type/state';
import { Socket } from 'socket.io-client';
import { Store } from 'vuex';

export default function createChatSocketPlugin(ChatSocket: Socket) {
  return (store: Store<State>) => {
    ChatSocket.on(ChatSocketMessages.SESSION_CREATED, (payload: User) => {
      store.commit(StoreCommit.createSession, payload);
    });

    ChatSocket.on(ChatSocketMessages.SESSION_CLOSED, () => {
      store.commit(StoreCommit.deleteSession);
    });

    ChatSocket.on(ChatSocketMessages.USERS_UPDATE, (payload: Users) => {
      store.commit(StoreCommit.updateUsers, payload);
    });

    ChatSocket.on(ChatSocketMessages.CHAT_MESSAGE, (message: Message) => {
      store.commit(StoreCommit.addMessage, message);
    });

    ChatSocket.on(ChatSocketMessages.CONNECT_ERROR, (err) => {
      store.commit(StoreCommit.addError, err.message);
    });
  };
}
