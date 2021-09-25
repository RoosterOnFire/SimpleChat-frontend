import { Roles } from './enums';

export type State = {
  user: User;
  meta: Meta;
  users: User[];
  messages: Message[];
  errors: {
    nicknameInUse: boolean;
  };
};

export type User = {
  userId: string;
  sessionId: string;
  username: string;
  role: Roles;
};

export type Users = User[];

export type Meta = {
  currentPage: string;
  adminAccessKey: string;
};

export type Message = {
  id: number;
  user: string;
  value: string;
};
