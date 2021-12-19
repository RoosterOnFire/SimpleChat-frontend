import { Module } from "vuex"
import { Roles } from "@/type/TypeEnums"

export type State = {
  user?: User
  meta?: Meta
  rooms?: Rooms
}

export type User = {
  data: UserData
  errors: {
    invalidSignIn: boolean
    nicknameInUse: boolean
  }
}

export type UserData = {
  role: Roles
  sessionId: string
  userId: string
  username: string
}

export type Users = User[]

export type Meta = {
  pageCurrent: string
}

export type Room = {
  name: string
  users: string[]
  messages: Message[]
}

export type Rooms = {
  meta: {
    selected: string
  }
  rooms: Room[]
}

export type Message = {
  id: number
  user: string
  value: string
}

export type StoreModuleUser = Module<User, State>

export type StoreModuleMeta = Module<Meta, State>

export type StoreModuleRooms = Module<Rooms, State>
