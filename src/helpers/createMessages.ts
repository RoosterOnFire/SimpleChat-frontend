import { Message } from "@/type/TypeState"

export function createUserMessage(username: string, value: string): Message {
  return {
    id: Date.now(),
    user: username,
    value,
  }
}

export function createAppNotification(value: string): Message {
  return {
    id: Date.now(),
    user: "App",
    value,
  }
}
