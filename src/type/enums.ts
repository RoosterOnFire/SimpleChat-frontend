export enum RouteNames {
  DASHBOARD = 'Dashboard',
  DASHBOARD_ADMIN = 'Dashboard/Admin',
  DASHBOARD_CHAT = 'Dashboard/Chat',
  HOME = 'Home',
}

export enum SessionStorageKeys {
  SESSION = 'SIMPLECHATSESSIONID',
}

export enum StoreGetter {
  hasAccess = 'hasAccess',
  hasNickname = 'hasNickname',
  isCurrentUser = 'isCurrentUser',
  isUsernameAvailable = 'isUsernameAvailable',
  users = 'users',
}

export enum StoreCommit {
  addError = 'addError',
  addMessage = 'addMessage',
  createSession = 'createSession',
  deleteSession = 'deleteSession',
  messageChatJoin = 'messageChatJoin',
  messageChatLeave = 'messageChatLeave',
  updateCurrentPage = 'updateCurrentPage',
  updateMessages = 'updateMessages',
  updatePassword = 'updatePassword',
  updateUsername = 'updateUsername',
  updateUsers = 'updateUsers',
}

export enum StoreAction {
  addMessage = 'addMessage',
  connect = 'connect',
  joinChat = 'joinChat',
  kickUser = 'kickUser',
  logOff = 'logOff',
  restoreSession = 'restoreSession',
  updateNickname = 'updateNickname',
}

export enum ChatSocketMessages {
  CHAT_JOIN = 'chat:join',
  CHAT_MESSAGE = 'chat:message',
  CONNECT_ERROR = 'connect_error',
  SESSION_CLOSED = 'session:closed',
  SESSION_CREATED = 'session:created',
  USER_KICK = 'user:kick',
  USER_LOGOFF = 'user:logoff',
  USERS_UPDATE = 'users:update',
}

export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum Errors {
  ERROR_INVALID_SING_IN = 'ERROR_INVALID_SING_IN',
  ERROR_MISSING_PASSWORD = 'ERROR_MISSING_PASSWORD',
  ERROR_MISSING_USERNAME = 'ERROR_MISSING_USERNAME',
  ERROR_NICKNAME_IN_USE = 'ERROR_NICKNAME_IN_USE',
}
