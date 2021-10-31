<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import AppButton from "@/components/AppButton.vue";
import { StoreActions } from "@/type/TypeEnums";
import RoomsForm from "@/components/RoomsForm.vue";

export default defineComponent({
  components: { AppButton, RoomsForm },
  setup() {
    return {
      ...mapActions([StoreActions.roomsCreate, StoreActions.roomsJoin]),
    };
  },
});
</script>
    

<template>
  <div class="main page-rooms">
    <RoomsForm title="Join" :onClick="roomsJoin" />
    <RoomsForm title="Create" :onClick="roomsCreate" />
  </div>
</template>

<style lang="postcss">
.page-rooms {
  @apply w-2/3 mx-auto p-4;
}
</style>