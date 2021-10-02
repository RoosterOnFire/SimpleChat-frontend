export enum RouteNames {
  DASHBOARD = 'Dashboard',
  DASHBOARD_ADMIN = 'Dashboard/Admin',
  DASHBOARD_CHAT = 'Dashboard/Chat',
  HOME = 'Home',
}

export enum SessionStorageKeys {
  SESSION = 'SIMPLECHATSESSIONID',
}

export enum StoreGetters {
  hasAccess = 'hasAccess',
  hasNickname = 'hasNickname',
  isCurrentUser = 'isCurrentUser',
  isUsernameAvailable = 'isUsernameAvailable',
  isValidSignIn = 'isValidSignIn',
  users = 'users',
}

export enum StoreMutations {
  addMessage = 'addMessage',
  createSession = 'createSession',
  deleteSession = 'deleteSession',
  messageChatJoin = 'messageChatJoin',
  messageChatLeave = 'messageChatLeave',
  resetIsValidSignIn = 'resetIsValidSignIn',
  updateCurrentPage = 'updateCurrentPage',
  updateMessages = 'updateMessages',
  updatePassword = 'updatePassword',
  updateSession = 'updateSession',
  updateUsername = 'updateUsername',
  updateUsers = 'updateUsers',
}

export enum StoreActions {
  addMessage = 'addMessage',
  createSession = 'createSession',
  joinChat = 'joinChat',
  kickUser = 'kickUser',
  logOff = 'logOff',
  signIn = 'signIn',
  updateNickname = 'updateNickname',
  addError = 'addError',
}

export enum ChatSocketMessages {
  CHAT_JOIN = 'chat:join',
  CHAT_MESSAGE = 'chat:message',
  CONNECT_ERROR = 'connect_error',
  CONNECT_VALID = 'connect:valid',
  SESSION_CLOSED = 'session:closed',
  SESSION_CREATED = 'session:created',
  SESSION_RESTORE = 'session:restore',
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
