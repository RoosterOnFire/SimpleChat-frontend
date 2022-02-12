<template>
  <div
    class="mx-auto flex w-1/3 flex-1 flex-col items-stretch gap-8 overflow-hidden p-4 md:flex-row"
  >
    <RoomsForm title="Join" :on-click="roomsJoin" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import { mapActions } from "vuex"
  import { StoreActions } from "@/type/TypeEnums"
  import RoomsForm from "@/components/RoomsForm.vue"

  export default defineComponent({
    components: { RoomsForm },
    setup() {
      return {
        ...mapActions([StoreActions.roomsCreate, StoreActions.roomsJoin]),
      }
    },
  })
</script>
