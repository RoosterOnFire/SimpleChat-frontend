export enum StatusUser {
  start = "start",
  pending = "pending",
  fulfilled = "fulfilled",
  rejected = "rejected",
}

export enum RouteNames {
  dashboard = "dashboard",
  dashboard_chat = "dashboard/chat",
  dashboard_rooms = "dashboard/rooms",
  dashboard_settings_user = "dashboard/settings/user",
  home = "home",
  login = "home/login",
  registration = "home/registration",
}

export enum sessionStorageKeys {
  current_page = "simplechatcurrentpage",
  session = "simplechatsessionid",
}
