export type Room = {
  name: string
  users: string[]
  messages: Message[]
}

export type Rooms = {
  selectedRoom: string | undefined
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
