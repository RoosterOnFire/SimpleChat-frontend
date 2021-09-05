import { User } from '@/type/Data';

const KEY = 'USER';

export function saveUser(payload: User) {
  sessionStorage.setItem(KEY, JSON.stringify(payload));
}

export function getUser(): User {
  const user = sessionStorage.getItem(KEY);

  if (user) {
    return JSON.parse(user);
  }

  return { id: '', nickname: '' };
}
