import { Message, User } from '@/type/state';

export function createUserMessage(user: User, value: string): Message {
  return {
    id: Date.now(),
    user: user.username,
    value,
  };
}

export function createAppNotification(value: string): Message {
  return {
    id: Date.now(),
    user: 'App',
    value,
  };
}