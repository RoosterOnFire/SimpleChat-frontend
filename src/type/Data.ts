export type State = {
  user: User;
  userExtra: UserExtra;
  users: User[];
  messages: Message[];
  errors: ChatErrors;
};

export type Users = User[];

export type User = {
  userId: string;
  sessionId: string;
  username: string;
  role: 'user' | 'admin';
};

export type UserExtra = {
  currentPage: string;
  adminAccessKey: string;
};

export type Message = {
  id: number;
  user: string;
  value: string;
};

export type ChatErrors = {
  nicknameInUse: boolean;
};

export type ChatSession = {
  userId: string;
  sessionId: string;
};
