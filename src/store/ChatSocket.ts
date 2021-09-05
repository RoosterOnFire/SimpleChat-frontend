import { io } from 'socket.io-client';
import { Users, User, Message } from '@/type/Data';
import { store } from '@/store/Store';

const ChatSocket = io(import.meta.env.VITE_SOCKET_ENDPOINT, {
  autoConnect: false,
});

// DEV ONLY
ChatSocket.onAny((event, ...args) => {
  if (import.meta.env.DEV) {
    console.log(event, args);
  }
});

ChatSocket.on('connect', () => {
  store.commit('updateUser', ChatSocket.id);
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
  if (err.message === 'NICKNAME_IN_USE') {
    store.commit('addError', err.message);
  }
});

export default ChatSocket;
