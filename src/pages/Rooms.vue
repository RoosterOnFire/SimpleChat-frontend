<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import AppButton from "@/components/AppButton.vue";
import { StoreActions } from "@/type/enums";
import RoomsForm from "@/components/RoomsForm.vue";

export default defineComponent({
  components: { AppButton, RoomsForm },
  setup() {
    return {
      ...mapActions([StoreActions.createRoom, StoreActions.joinRoom]),
    };
  },
});
</script>
    

<template>
  <div class="main page-rooms">
    <RoomsForm title="Join" :onClick="joinRoom" />
    <RoomsForm title="Create" :onClick="createRoom" />
  </div>
</template>

<style lang="postcss">
.page-rooms {
  @apply p-4;
}
</style>