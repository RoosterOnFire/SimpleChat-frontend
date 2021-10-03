<script lang="ts">
import AppButton from "@/components/AppButton.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { AppButton },
  setup() {},
});
</script>
    

<template>
  <div class="main page-rooms">
    <form class="form md:flex-1" @submit.prevent="">
      <input type="text" class="input" placeholder="Room" />
      <AppButton title="Join" />
    </form>
    <form class="form md:flex-1" @submit.prevent="">
      <input type="text" class="input" placeholder="Room" />
      <AppButton title="Create" />
    </form>
  </div>
</template>

<style lang="postcss">
.page-rooms {
  @apply p-4;
}
</style>