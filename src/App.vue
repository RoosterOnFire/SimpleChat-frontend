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
    <div :class="[route.name === 'Login' ? 'login' : 'page']">
      <component :is="Component" :key="route.path" />
    </div>
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
    @apply container h-screen flex items-stretch;
  }

  .page {
    @apply container flex items-stretch;
  }

  .login {
    @apply container flex flex-col items-center justify-around;
  }

  .sidebar {
    @apply w-0 md:w-1/5 md:p-4 flex flex-col bg-indigo-600;
    @apply invisible md:visible;
  }

  .main {
    @apply flex-1 flex flex-col items-stretch justify-around;
  }

  .input {
    @apply block w-full mx-auto px-3 py-2;
    @apply sm:text-sm text-gray-900 placeholder-gray-500;
    @apply rounded-md border-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10;
    @apply appearance-none focus:outline-none;
  }
}
</style>