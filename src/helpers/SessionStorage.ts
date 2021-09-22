import { User } from '@/type/Data';

const KEY = 'SIMPLECHATSESSIONID';

export function saveToStorage(payload: User) {
  sessionStorage.setItem(KEY, payload.sessionId);
}

export function restoreFromStorage() {
  return sessionStorage.getItem(KEY);
}

export function clearStorage() {
  sessionStorage.removeItem(KEY);
}
