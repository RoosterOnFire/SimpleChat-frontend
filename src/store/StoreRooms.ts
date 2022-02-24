import { defineStore } from "pinia"
import { RoomMessage, Rooms } from "@/types/TypeStateRooms"
import { useUserStore } from "@/store/StoreUser"
import { createUserMessage } from "@/helpers/createMessages"
import { RouteNames } from "@/types/TypeEnums"

export const useRoomsStore = defineStore("roomsStore", {
  state: (): Rooms => {
    return {
      meta: {
        selected: "",
      },
      rooms: [],
    }
  },

  getters: {
    roomsMessages: (state) => {
      return (
        state.rooms.find((room) => room.name === state.meta.selected)
          ?.messages || []
      )
    },
  },

  actions: {
    roomsJoin(payload: string) {
      this.meta.selected = payload
      this.plugins.router?.push({ name: RouteNames.dashboard_chat })
    },
    roomsUpdate(payload: { name: string }) {
      const room = this.rooms.find((room) => room.name === payload.name)
      if (!room) {
        this.rooms.push({ name: payload.name, users: [], messages: [] })
      }
    },
    messageCreate(payload: RoomMessage) {
      this.rooms
        .find((room) => room.name === this.meta.selected)
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
        room: this.meta.selected,
        message: createUserMessage(user.data.username, payload),
      })
    },
  },
})
