export enum RouteNames {
  HOME = 'HOME',
  DASHBOARD = 'DASHBOARD',
  DASHBOARD_CHAT = 'DASHBOARD_CHAT',
  DASHBOARD_ADMIN = 'DASHBOARD_ADMIN',
}

export enum SessionStorageKeys {
  SESSION = 'SIMPLECHATSESSIONID',
}

export enum GetterTypes {
  hasAccess = 'hasAccess',
  hasNickname = 'hasNickname',
}

export enum CommitTypes {
  addError = 'addError',
  addMessage = 'addMessage',
  createSession = 'createSession',
  deleteSession = 'deleteSession',
  messageChatJoin = 'messageChatJoin',
  messageChatLeave = 'messageChatLeave',
  updateCurrentPage = 'updateCurrentPage',
  updateNickname = 'updateNickname',
  updateUsers = 'updateUsers',
}

export enum ActionTypes {
  connect = 'connect',
  restoreSession = 'restoreSession',
  joinChat = 'joinChat',
  addMessage = 'addMessage',
  updateNickname = 'updateNickname',
  kickUser = 'kickUser',
  logOff = 'logOff',
}

export enum Errors {
  ERROR_MISSING_NICKNAME = 'ERROR_MISSING_NICKNAME',
  ERROR_NICKNAME_IN_USE = 'ERROR_NICKNAME_IN_USE',
}
