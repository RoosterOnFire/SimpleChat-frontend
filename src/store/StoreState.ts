import { Roles } from '@/type/TypeEnums';
import { State } from '@/type/TypeState';

export const state: State = {
  user: {
    userId: '',
    sessionId: '',
    username: '',
    role: Roles.USER,
  },
  meta: {
    pageCurrent: '',
    chatSelected: undefined,
  },
  rooms: [],
  errors: {
    nicknameInUse: false,
    invalidSignIn: false,
  },
};
