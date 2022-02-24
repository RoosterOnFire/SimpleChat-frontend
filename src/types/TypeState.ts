import { Rooms } from "@/types/TypeStateRooms"
import { User } from "./TypeStateUser"

export type State = {
  user?: User
  meta?: Meta
  rooms?: Rooms
}

export type Meta = {
  pageCurrent: string
}
