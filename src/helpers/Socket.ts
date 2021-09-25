import { io } from 'socket.io-client';
import { Users, User, Message } from '@/type/data';
import { store } from '@/store/Store';
import { ChatSocketMessages, CommitTypes } from '@/type/enums';

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
  store.commit(CommitTypes.createSession, payload);
});

ChatSocket.on(ChatSocketMessages.SESSION_CLOSED, () => {
  store.commit(CommitTypes.deleteSession);
});

ChatSocket.on(ChatSocketMessages.USERS_UPDATE, (payload: Users) => {
  store.commit(CommitTypes.updateUsers, payload);
});

ChatSocket.on(ChatSocketMessages.CHAT_MESSAGE, (message: Message) => {
  store.commit(CommitTypes.addMessage, message);
});

ChatSocket.on(ChatSocketMessages.CONNECT_ERROR, (err) => {
  store.commit(CommitTypes.addError, err.message);
});

export default ChatSocket;
