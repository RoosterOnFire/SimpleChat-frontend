import { User } from '@/type/state';
import { SessionStorageKeys } from '@/type/enums';
import { Session } from 'inspector';

export function storeSessionId(payload: User) {
  sessionStorage.setItem(SessionStorageKeys.SESSION, payload.sessionId);
}

export function restoreSessionId() {
  return sessionStorage.getItem(SessionStorageKeys.SESSION);
}

export function clearSessionId() {
  sessionStorage.removeItem(SessionStorageKeys.SESSION);
}
