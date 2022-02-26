<template>
  <div
    v-if="isChatSelected"
    class="flex flex-1 flex-col items-stretch overflow-hidden"
  >
    <ChatMessages />
    <ChatForm />
  </div>
  <div
    v-else
    class="mx-auto flex w-1/3 flex-1 flex-col items-stretch gap-8 overflow-hidden p-4"
  >
    {{ isChatSelected }}
    <h1
      class="my-auto bg-gray-50 bg-opacity-30 text-center text-lg text-primary"
    >
      {{ "You have not joined any rooms" }}
    </h1>
    <RoomsForm title="Join" :on-click="joinRoom" />
  </div>
</template>

<script lang="ts">
  import ChatForm from "@/components/ChatForm.vue"
  import ChatMessages from "@/components/ChatMessages.vue"
  import RoomsForm from "@/components/RoomsForm.vue"
  import { useRoomsStore } from "@/store/StoreRooms"
  import { computed, defineComponent } from "vue"

  export default defineComponent({
    components: {
      ChatMessages,
      ChatForm,
      RoomsForm,
    },
    setup() {
      const rooms = useRoomsStore()

      return {
        isChatSelected: computed(() => rooms.selectedRoom),
        joinRoom: rooms.roomsJoin,
      }
    },
  })
</script>
