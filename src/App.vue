<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store/Store";

export default defineComponent({
  setup() {
    const store = useStore();

    store.dispatch("restoreSession");
  },
});
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<style lang="postcss" >
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  body {
    @apply bg-gray-50;
  }

  #app {
    @apply container h-screen;
  }

  .input {
    @apply block w-full mx-auto px-3 py-2;
    @apply sm:text-sm text-gray-900 placeholder-gray-500;
    @apply rounded-md border-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10;
    @apply appearance-none focus:outline-none;
  }
}
</style>