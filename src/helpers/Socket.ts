import { io } from 'socket.io-client';
import { Users, User, Message } from '@/type/data';
import { store } from '@/store/Store';
import { CommitTypes } from '@/type/enums';

const ChatSocket = io(import.meta.env.VITE_SOCKET_ENDPOINT, {
  autoConnect: false,
});

// DEV ONLY
ChatSocket.onAny((event, ...args) => {
  if (import.meta.env.DEV) {
    console.log('socket event:', event, args);
  }
});

ChatSocket.on('session:created', (payload: User) => {
  store.commit(CommitTypes.createSession, payload);
});

ChatSocket.on('session:closed', () => {
  store.commit(CommitTypes.deleteSession);
});

ChatSocket.on('users:update', (payload: Users) => {
  store.commit(CommitTypes.updateUsers, payload);
});

ChatSocket.on('chat:message', (message: Message) => {
  store.commit(CommitTypes.addMessage, message);
});

ChatSocket.on('connect_error', (err) => {
  store.commit(CommitTypes.addError, err.message);
});

export default ChatSocket;
