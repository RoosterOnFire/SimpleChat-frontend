import { Roles } from './TypeEnums';

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
};

export type Users = User[];

export type Meta = {
  pageCurrent: string;
  chatSelected: string | undefined;
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
