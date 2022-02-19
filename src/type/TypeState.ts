import { Roles, StatusUser } from "@/type/TypeEnums"
import { Router } from "vue-router"

export type State = {
  user?: User
  meta?: Meta
  rooms?: Rooms
}

export type User = {
  status: StatusUser
  data: UserData
  router: Router | undefined
  errors: {
    login: {
      invalidSignIn: boolean
    }
    register: {
      nicknameInUse: boolean
    }
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
export type RoomMessage = {
  room: string
  message: Message
}

export type Message = {
  id: number
  user: string
  value: string
}
