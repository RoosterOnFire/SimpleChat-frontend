export enum RouteNames {
  DASHBOARD = 'dashboard',
  DASHBOARD_ADMIN = 'dashboard/admin',
  DASHBOARD_CHAT = 'dashboard/chat',
  DASHBOARD_ROOMS = 'dashboard/rooms',
  HOME = 'home',
  HOME_LOGIN = 'home/login',
  HOME_REGISTRATION = 'home/registration',
}

export enum SessionStorageKeys {
  CURRENT_PAGE = 'SIMPLECHATCURRENTPAGE',
  SESSION = 'SIMPLECHATSESSIONID',
}

export enum StoreGetters {
  currentpage = 'currentPage',
  hasAccess = 'hasAccess',
  hasNickname = 'hasNickname',
  isCurrentUser = 'isCurrentUser',
  isUsernameAvailable = 'isUsernameAvailable',
  isValidSignIn = 'isValidSignIn',
  joinedRooms = 'joinedRooms',
  users = 'users',
}

export enum StoreMutations {
  createMessage = 'createMessage',
  createRoom = 'createRoom',
  createSession = 'createSession',
  deleteSession = 'deleteSession',
  messageChatJoin = 'messageChatJoin',
  messageChatLeave = 'messageChatLeave',
  resetIsValidSignIn = 'resetIsValidSignIn',
  updateCurrentPage = 'updateCurrentPage',
  updateMessages = 'updateMessages',
  updateRooms = 'updateRooms',
  updateSession = 'updateSession',
  updateUsers = 'updateUsers',
}

export enum StoreActions {
  addError = 'addError',
  addMessage = 'addMessage',
  createRoom = 'createRoom',
  createSession = 'createSession',
  joinRoom = 'joinRoom',
  kickUser = 'kickUser',
  leaveRoom = 'leaveRoom',
  logOff = 'logOff',
  signIn = 'signIn',
  updateNickname = 'updateNickname',
  register = 'register',
}

export enum ChatSocketMessages {
  CHAT_JOIN = 'chat:join',
  CHAT_MESSAGE = 'chat:message',
  CONNECT_ERROR = 'connect_error',
  CONNECT_LOGOFF = 'connect:logoff',
  CONNECT_REGISTRATION = 'connect:registration',
  CONNECT_SIGNIN = 'connect:signin',
  ROOMS_CREATE = 'rooms:create',
  ROOMS_JOIN = 'rooms:join',
  ROOMS_LEAVE = 'rooms:leave',
  SESSION_CLOSED = 'session:closed',
  SESSION_CREATED = 'session:created',
  SESSION_RESTORE = 'session:restore',
  USER_KICK = 'user:kick',
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
