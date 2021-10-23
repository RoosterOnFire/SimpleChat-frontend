import { Roles } from '@/type/enums';
import { State } from '@/type/state';

export const state: State = {
  user: {
    userId: '',
    sessionId: '',
    username: '',
    role: Roles.USER,
  },
  meta: {
    currentPage: '',
    adminAccessKey: '',
  },
  rooms: [],
  errors: {
    nicknameInUse: false,
    invalidSignIn: false,
  },
};
