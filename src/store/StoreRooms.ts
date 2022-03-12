import { createUserMessage } from "@/helpers/createMessages"
import { useUserStore } from "@/store/StoreUser"
import { RouteNames } from "@/types/TypeEnums"
import { RoomMessage, Rooms } from "@/types/TypeStateRooms"
import { defineStore } from "pinia"

export const useRoomsStore = defineStore("roomsStore", {
  state: (): Rooms => {
    return {
      selectedRoom: undefined,
      rooms: [],
    }
  },

  getters: {
    roomsMessages: (state) => {
      return (
        state.rooms.find((room) => room.name === state.selectedRoom)
          ?.messages || []
      )
    },
  },

  actions: {
    roomsJoin(payload: string) {
      this.roomsClearSelectedRoom()
      this.selectedRoom = payload
      this.plugins.router?.push({ name: RouteNames.dashboard_chat })
    },
    roomsJoinFulfilled(payload: { name: string }) {
      const room = this.rooms.find((room) => room.name === payload.name)
      if (room === undefined) {
        this.rooms.push({ name: payload.name, users: [], messages: [] })
      }
    },
    roomsClearSelectedRoom() {
      const selectedRoom = this.rooms.find(
        (room) => room.name === this.selectedRoom
      )

      if (selectedRoom?.messages && selectedRoom.users) {
        selectedRoom.messages = []
        selectedRoom.users = []
      }
    },
    messageCreate(payload: RoomMessage) {
      this.rooms
        .find((room) => room.name === this.selectedRoom)
        ?.messages.push(payload.message)
    },
    messagesUpdate(payload: RoomMessage) {
      this.rooms
        .find((room) => room.name === payload.room)
        ?.messages.push(payload.message)
    },
    messagesAdd(payload: string) {
      const user = useUserStore()
      if (!user) {
        return
      }

      this.messageCreate({
        room: this.selectedRoom as string,
        message: createUserMessage(user.data.username, payload),
      })
    },
  },
})
