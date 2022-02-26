<template>
  <div
    class="mx-auto flex w-1/3 flex-1 flex-col items-stretch gap-8 overflow-hidden p-4"
  >
    <RoomsForm title="Join" :on-click="joinRoom" />
  </div>
</template>

<script lang="ts">
  import RoomsForm from "@/components/RoomsForm.vue"
  import { useRoomsStore } from "@/store/StoreRooms"
  import { defineComponent } from "vue"

  export default defineComponent({
    components: { RoomsForm },
    setup() {
      const rooms = useRoomsStore()
      return {
        joinRoom: rooms.roomsJoin,
      }
    },
  })
</script>
