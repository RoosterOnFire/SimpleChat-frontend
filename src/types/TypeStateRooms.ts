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
