export enum RouteNames {
  HOME = 'HOME',
  DASHBOARD = 'DASHBOARD',
  DASHBOARD_CHAT = 'DASHBOARD_CHAT',
  DASHBOARD_ADMIN = 'DASHBOARD_ADMIN',
}

export enum SessionStorageKeys {
  SESSION = 'SIMPLECHATSESSIONID',
}

export enum StoreGetter {
  users = 'users',
  isCurrentUser = 'isCurrentUser',
  hasAccess = 'hasAccess',
  hasNickname = 'hasNickname',
  isUsernameAvailable = 'isUsernameAvailable',
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
  updateNickname = 'updateNickname',
  updateUsers = 'updateUsers',
}

export enum StoreAction {
  addMessage = 'addMessage',
  connect = 'connect',
  connectAdmin = 'connectAdmin',
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
  ERROR_MISSING_NICKNAME = 'ERROR_MISSING_NICKNAME',
  ERROR_NICKNAME_IN_USE = 'ERROR_NICKNAME_IN_USE',
}
