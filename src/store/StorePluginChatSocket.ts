import { io } from "socket.io-client"
import { PiniaPluginContext } from "pinia"
import { ChatSocketMessages, Errors } from "@/types/TypeShared"
import { UserData } from "@/types/TypeStateUser"
import { RoomMessage } from "@/types/TypeStateRooms"
import { useUserStore } from "@/store/StoreUser"
import { useRoomsStore } from "@/store/StoreRooms"
import { sessionStorageKeys } from "@/types/TypeEnums"

type CallbackPayload = {
  success: boolean
  message: string
  data: { name: string }
}

const ChatSocket = io(import.meta.env.VITE_SOCKET_ENDPOINT, {
  autoConnect: false,
})

export const createPluginChatSocket = ({ store }: PiniaPluginContext) => {
  ChatSocket.onAny((event, ...args) => {
    if (import.meta.env.DEV) {
      console.log("socket event:", event, args)
    }
  })

  ChatSocket.on(ChatSocketMessages.session_closed, () => {
    const user = useUserStore()
    user.sessionDelete()
  })

  ChatSocket.on(ChatSocketMessages.chat_message, (message: RoomMessage) => {
    const rooms = useRoomsStore()
    rooms.messagesUpdate(message)
  })

  ChatSocket.on(ChatSocketMessages.connect_error, (err) => {
    const user = useUserStore()
    user.errorsAdd(err.message)
  })

  store.$onAction(({ name, args }) => {
    const userStore = useUserStore()

    switch (name) {
      case "sessionRestore":
        ChatSocket.auth = {
          sessionId: sessionStorage.getItem(sessionStorageKeys.session) || "",
        }
        ChatSocket.connect()
        ChatSocket.emit(
          ChatSocketMessages.connect_signin,
          {},
          (payload: { success: boolean; data: UserData; error: string }) => {
            if (payload.error) {
              return userStore.errorsUpdate(payload.error)
            }

            userStore.sessionCreate(payload.data)
          }
        )
        break

      case "userSignIn":
        ChatSocket.connect()
        ChatSocket.emit(
          ChatSocketMessages.connect_signin,
          {
            username: args[0].username,
            password: args[0].username,
          },
          (payload: { success: boolean; data?: UserData; error?: Errors }) => {
            if (payload.error) {
              userStore.errorsAdd(payload.error)
            } else if (payload.data) {
              userStore.sessionCreate(payload.data)
            }
          }
        )
        break

      case "userLogout":
        ChatSocket.emit(ChatSocketMessages.connect_logout)
        ChatSocket.auth = {}
        break

      default:
        break
    }
  })

  store.$onAction(({ name, args }) => {
    const roomsStore = useRoomsStore()

    switch (name) {
      case "roomsJoin":
        ChatSocket.emit(
          ChatSocketMessages.rooms_join,
          { roomName: args[0] },
          (payload: CallbackPayload) => {
            if (payload.success) {
              return roomsStore.roomsUpdate(payload.data)
            }
            console.error(payload)
          }
        )
        break

      default:
        break
    }
  })
}
