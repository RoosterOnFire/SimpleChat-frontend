export type State = {
  user: User;
  users: User[];
  messages: Message[];
  errors: ChatErrors;
};

export type Users = User[];

export type User = {
  id: string;
  nickname: string;
};

export type Message = {
  id: number;
  user: string;
  value: string;
};

export type ChatErrors = {
  nicknameInUse: boolean;
};

export type ChatErrorKind = 'MISSING_NICKNAME' | 'NICKNAME_IN_USE';
