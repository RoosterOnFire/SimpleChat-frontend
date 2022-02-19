import { io } from "socket.io-client"
import { PiniaPluginContext } from "pinia"
import { ChatSocketMessages, Errors } from "@/type/TypeEnums"
import { RoomMessage, UserData } from "@/type/TypeState"
import { useUserStore } from "./StoreUser"
import { useRoomsStore } from "./StoreRooms"

// type CallbackPayload = {
//   success: boolean
//   message: string
//   data: { name: string }
// }

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

  store.$onAction(({ name, args, after }) => {
    const user = useUserStore()

    switch (name) {
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
              user.errorsAdd(payload.error)
            } else if (payload.data) {
              user.sessionCreate(payload.data)
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

    after(() => {
      //     switch (action.type) {
      //       case StoreActions.register:
      //         ChatSocket.auth = { newUser: true }
      //         ChatSocket.connect()
      //         ChatSocket.emit(
      //           ChatSocketMessages.CONNECT_REGISTRATION,
      //           {
      //             username: action.payload?.username || "",
      //             password: action.payload?.password || "",
      //           },
      //           (payload: { success: boolean; data: User }) => {
      //             if (payload.success) {
      //               context.store.dispatch(StoreActions.sessionCreate, payload.data)
      //             } else {
      //               console.log(payload)
      //             }
      //           }
      //         )
      //         break
      //       case StoreActions.sessionRestore:
      //         ChatSocket.auth = {
      //           sessionId: state.user?.data.sessionId,
      //         }
      //         ChatSocket.connect()
      //         ChatSocket.emit(
      //           ChatSocketMessages.CONNECT_SIGNIN,
      //           {},
      //           (payload: { success: boolean; data?: User; error?: string }) => {
      //             if (payload.error) {
      //               context.store.commit(StoreMutations.errorsUpdate, payload.error)
      //             } else {
      //               context.store.dispatch(StoreActions.sessionCreate, payload.data)
      //             }
      //           }
      //         )
      //         break
      //       case StoreActions.userSignIn:
      //         ChatSocket.connect()
      //         ChatSocket.emit(
      //           ChatSocketMessages.CONNECT_SIGNIN,
      //           {
      //             username: action.payload?.username,
      //             password: action.payload?.password,
      //           },
      //           (payload: { success: boolean; data?: User; error?: string }) => {
      //             if (payload.error) {
      //               context.store.commit(StoreMutations.errorsUpdate, payload.error)
      //             } else {
      //               context.store.dispatch(StoreActions.sessionCreate, payload.data)
      //             }
      //           }
      //         )
      //         break
      //       case StoreActions.roomsCreate:
      //         ChatSocket.emit(
      //           ChatSocketMessages.ROOMS_CREATE,
      //           { roomName: action.payload },
      //           () => {
      //             context.store.commit(StoreMutations.roomsCreate, {
      //               name: action.payload,
      //             })
      //           }
      //         )
      //         break
      //       case StoreActions.roomsJoin:
      //         ChatSocket.emit(
      //           ChatSocketMessages.ROOMS_JOIN,
      //           { roomName: action.payload },
      //           (payload: CallbackPayload) => {
      //             if (payload.success) {
      //               return context.store.commit(StoreMutations.roomsJoin, {
      //                 name: payload.data.name,
      //               })
      //             }
      //             console.error(payload)
      //           }
      //         )
      //         break
      //       case StoreActions.roomsLeave:
      //         ChatSocket.emit(
      //           ChatSocketMessages.ROOMS_LEAVE,
      //           { roomName: action.payload },
      //           console.log
      //         )
      //         break
      //       case StoreActions.usersKick:
      //         ChatSocket.emit(ChatSocketMessages.USER_KICK, {
      //           userId: action.payload,
      //         })
      //         break
      //       default:
      //         break
      //     }
      //   },
    })
  })
}
