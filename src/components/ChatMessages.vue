<template>
  <div ref="container" class="flex-1 space-y-4 overflow-y-auto p-4">
    <p
      v-for="(message, index) of messages"
      :key="index"
      class="w-max cursor-default select-all rounded-full border-2 bg-white px-4 py-2 text-black"
      :class="{ 'text-blue-600': message.user === 'App' }"
    >
      {{ message.user }}: {{ message.value }}
    </p>
  </div>
</template>

<script lang="ts" setup>
  import { useRoomsStore } from "@/store/StoreRooms"
  import { Message } from "@/types/TypeStateRooms"
  import { ref, onUpdated, computed } from "vue"

  const container = ref<HTMLElement | null>(null)
  const rooms = useRoomsStore()

  const messages = computed<Message[]>(() => rooms.roomsMessages)

  onUpdated(() => {
    container.value?.lastElementChild?.scrollIntoView()
  })
</script>
