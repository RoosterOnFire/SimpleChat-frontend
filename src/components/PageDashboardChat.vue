<template>
  <div
    v-if="isChatSelected"
    class="flex flex-1 flex-col items-stretch gap-8 overflow-hidden"
  >
    <ChatMessages />
    <ChatForm />
  </div>
  <div v-else class="flex h-full justify-center">
    <h1 class="my-auto bg-gray-50 bg-opacity-30 text-lg text-primary">
      {{ "You have not joined any rooms" }}
    </h1>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import ChatMessages from "@/components/ChatMessages.vue"
  import ChatForm from "@/components/ChatForm.vue"
  import { useRoomsStore } from "@/store/StoreRooms"

  export default defineComponent({
    components: {
      ChatMessages,
      ChatForm,
    },
    setup() {
      const rooms = useRoomsStore()

      return {
        isChatSelected: rooms.meta.selected,
      }
    },
  })
</script>
