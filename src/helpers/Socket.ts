import { io } from 'socket.io-client';
import { Users, User, Message } from '@/type/data';
import { store } from '@/store/Store';
import { ChatSocketMessages, StoreCommit } from '@/type/enums';

const ChatSocket = io(import.meta.env.VITE_SOCKET_ENDPOINT, {
  autoConnect: false,
});

// DEV ONLY
ChatSocket.onAny((event, ...args) => {
  if (import.meta.env.DEV) {
    console.log('socket event:', event, args);
  }
});

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

export default ChatSocket;
