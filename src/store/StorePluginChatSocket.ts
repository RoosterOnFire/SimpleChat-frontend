import { useRoomsStore } from "@/store/StoreRooms"
import { useUserStore } from "@/store/StoreUser"
import { sessionStorageKeys } from "@/types/TypeEnums"
import { ChatSocketMessages, Errors } from "@/types/TypeShared"
import { RoomMessage } from "@/types/TypeStateRooms"
import { UserData } from "@/types/TypeStateUser"
import { PiniaPluginContext } from "pinia"
import { io } from "socket.io-client"

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
          (payload: { success: boolean; data: UserData; error: Errors }) => {
            if (payload.success) {
              return userStore.userSignInFulfilled(payload.data)
            }
            userStore.userSignInRejected(payload.error)
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
          (payload: { success: boolean; data: UserData; error: Errors }) => {
            if (payload.success) {
              return userStore.userSignInFulfilled(payload.data)
            }
            userStore.userSignInRejected(payload.error)
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
              console.log("here here here")
              return roomsStore.roomsJoinFulfilled(payload.data)
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
