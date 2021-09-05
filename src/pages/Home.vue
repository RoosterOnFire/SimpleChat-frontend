<script lang="ts">
import { defineComponent } from "vue";
import HomeForm from "@/components/HomeForm.vue";

export default defineComponent({
  components: { HomeForm },
  setup() {},
});
</script>

<template>
  <div class="home">
    <h1 class="header">Simple Chat</h1>
    <HomeForm />
  </div>
</template>

<style lang="postcss">
.home {
  @apply flex flex-col justify-around items-center;
  @apply h-full;
  @apply text-center;
}

.header {
  @apply text-5xl font-bold text-indigo-600;
}
</style>