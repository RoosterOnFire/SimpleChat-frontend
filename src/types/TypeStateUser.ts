import { StatusUser } from "@/types/TypeEnums"
import { Errors, Roles } from "@/types/TypeShared"

export type User = {
  status: StatusUser
  data: UserData
  errors: {
    [key in Errors]?: boolean
  }
}

export type UserData = {
  role: Roles
  sessionId: string
  userId: string
  username: string
}

export type Users = User[]
