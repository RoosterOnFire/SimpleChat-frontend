import { Router } from "vue-router"
import { StatusUser } from "@/types/TypeEnums"
import { Roles } from "@/types/TypeShared"

export type User = {
  status: StatusUser
  data: UserData
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
