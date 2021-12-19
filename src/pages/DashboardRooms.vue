<template>
  <div class="main w-1/3 mx-auto p-4">
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
