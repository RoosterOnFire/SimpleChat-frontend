import { User } from '@/type/state';
import { SessionStorageKeys } from '@/type/enums';

export function storeSessionId(payload: User) {
  sessionStorage.setItem(SessionStorageKeys.SESSION, payload.sessionId);
}

export function restoreSessionId() {
  return sessionStorage.getItem(SessionStorageKeys.SESSION);
}

export function clearSessionId() {
  sessionStorage.removeItem(SessionStorageKeys.SESSION);
}
