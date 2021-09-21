import { io } from 'socket.io-client';
import { Users, User, Message, ChatSession } from '@/type/Data';
import { store } from '@/store/Store';

const ChatSocket = io(import.meta.env.VITE_SOCKET_ENDPOINT, {
  autoConnect: false,
});

// DEV ONLY
ChatSocket.onAny((event, ...args) => {
  if (import.meta.env.DEV) {
    console.log('socket event:', event, args);
  }
});

ChatSocket.on('session', (payload: User) => {
  store.commit('updateSession', payload);
});

ChatSocket.on('session:close', () => {
  store.commit('closeSession');
});

ChatSocket.on('users:update', (payload: Users) => {
  store.commit('updateUsers', payload);
});

ChatSocket.on('chat:leave', (payload: User) => {
  store.commit('notifyChatLeave', payload);
});

ChatSocket.on('chat:message', (message: Message) => {
  store.commit('addMessage', message);
});

ChatSocket.on('connect_error', (err) => {
  store.commit('addError', err.message);
});

export default ChatSocket;
