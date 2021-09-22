import ChatSocket from '@/helpers/Socket';
import { Message, User } from '@/type/Data';

export function sendChatJoin(payload: User) {
  ChatSocket.emit('chat:join', payload);
}

export function sendMessage(payload: Message) {
  ChatSocket.emit('chat:message', payload);
}

export function createMessage(user: User, value: string): Message {
  return {
    id: Date.now(),
    user: user.username,
    value,
  };
}

export function createNotification(value: string): Message {
  return {
    id: Date.now(),
    user: 'App',
    value,
  };
}

export function kickUser(userId: string) {
  ChatSocket.emit('user:kick', { userId });
}

export function logoffUser() {
  ChatSocket.emit('user:logoff');
}
