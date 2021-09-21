import { User } from '@/type/Data';

const KEY = 'SIMPLECHATSESSIONID';

export function saveSession(payload: User) {
  sessionStorage.setItem(KEY, payload.sessionId);
}

export function restoreSession() {
  return sessionStorage.getItem(KEY);
}

export function clearSession() {
  sessionStorage.removeItem(KEY);
}
