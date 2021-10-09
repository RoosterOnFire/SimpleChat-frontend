import { Roles } from './enums';

export type State = {
  user: User;
  meta: Meta;
  rooms: Rooms;
  errors: {
    invalidSignIn: boolean;
    nicknameInUse: boolean;
  };
};

export type User = {
  role: Roles;
  sessionId: string;
  userId: string;
  username: string;
  password?: string;
};

export type Users = User[];

export type Meta = {
  currentPage: string;
  adminAccessKey: string;
};

export type Room = {
  name: string;
  users: string[];
  messages: Messages;
};

export type Rooms = Room[];

export type Message = {
  id: number;
  user: string;
  value: string;
};

export type Messages = Message[];
