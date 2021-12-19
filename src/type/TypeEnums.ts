export enum StatusUser {
  start = "start",
  pending = "pending",
  fulfilled = "fulfilled",
  rejected = "rejected",
}

export enum RouteNames {
  DASHBOARD = "dashboard",
  DASHBOARD_ADMIN = "dashboard/admin",
  DASHBOARD_CHAT = "dashboard/chat",
  DASHBOARD_ROOMS = "dashboard/rooms",
  HOME = "home",
  HOME_LOGIN = "home/login",
  HOME_REGISTRATION = "home/registration",
}

export enum SessionStorageKeys {
  CURRENT_PAGE = "SIMPLECHATCURRENTPAGE",
  SESSION = "SIMPLECHATSESSIONID",
}

export enum StoreGetters {
  chatCurrectMessage = "chatCurrectMessage",
  errorsInvalidSignIn = "errorsInvalidSignIn",
  hasAccess = "hasAccess",
  hasNickname = "hasNickname",
  isCurrentUser = "isCurrentUser",
  isUsernameAvailable = "isUsernameAvailable",
  pageCurrent = "pageCurrent",
  roomsJoined = "roomsJoined",
  roomsMessages = "roomsMessages",
  users = "users",
}

export enum StoreMutations {
  errorsUpdate = "errorsUpdate",
  messageChatJoin = "messageChatJoin",
  messageChatLeave = "messageChatLeave",
  messageCreate = "messageCreate",
  messagesUpdate = "messagesUpdate",
  pageCurrentUpdate = "pageCurrentUpdate",
  resetInvalidSignIn = "resetInvalidSignIn",
  roomsCreate = "roomsCreate",
  roomsJoin = "roomsJoin",
  roomsUpdate = "roomsUpdate",
  sessionCreate = "sessionCreate",
  sessionDelete = "sessionDelete",
  sessionUpdate = "sessionUpdate",
  usersUpdate = "usersUpdate",
  userUpdateStatus = "userUpdateStatus",
}

export enum StoreActions {
  sessionRestore = "sessionRestore",
  errorsAdd = "errorsAdd",
  userLogout = "userLogout",
  messagesAdd = "messagesAdd",
  register = "register",
  roomsCreate = "roomsCreate",
  roomsJoin = "roomsJoin",
  roomsLeave = "roomsLeave",
  sessionCreate = "sessionCreate",
  userSignIn = "userSignIn",
  usersKick = "usersKick",
  userUpdateUsername = "userUpdateUsername",
}

export enum ChatSocketMessages {
  CHAT_JOIN = "chat:join",
  CHAT_MESSAGE = "chat:message",
  CONNECT_ERROR = "connect_error",
  CONNECT_LOGOUT = "connect:logout",
  CONNECT_REGISTRATION = "connect:registration",
  CONNECT_SIGNIN = "connect:signin",
  ROOMS_CREATE = "rooms:create",
  ROOMS_JOIN = "rooms:join",
  ROOMS_LEAVE = "rooms:leave",
  SESSION_CLOSED = "session:closed",
  SESSION_CREATED = "session:created",
  SESSION_RESTORE = "session:restore",
  USER_KICK = "user:kick",
  USERS_UPDATE = "users:update",
}

export enum Roles {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum Errors {
  ERROR_INVALID_SING_IN = "ERROR_INVALID_SING_IN",
  ERROR_USERNAME_IN_USE = "ERROR_USERNAME_IN_USE",
  ERROR_NEW_USER_NOT_CREATED = "ERROR_NEW_USER_NOT_CREATED",
}
