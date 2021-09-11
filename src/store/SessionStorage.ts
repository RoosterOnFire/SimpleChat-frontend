import { User } from '@/type/Data';

const KEY = 'SIMPLECHATSESSIONID';

export function saveUser(payload: User) {
  sessionStorage.setItem(KEY, payload.sessionId);
}

export function getUser() {
  return sessionStorage.getItem(KEY);
}
