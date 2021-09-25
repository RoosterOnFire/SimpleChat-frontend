import { User } from '@/type/data';
import { SessionStorageKeys } from '@/type/enums';

export function saveToStorage(payload: User) {
  sessionStorage.setItem(SessionStorageKeys.SESSION, payload.sessionId);
}

export function restoreFromStorage() {
  return sessionStorage.getItem(SessionStorageKeys.SESSION);
}

export function clearStorage() {
  sessionStorage.removeItem(SessionStorageKeys.SESSION);
}
