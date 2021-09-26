<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store/Store";
import { StoreAction, RouteNames } from "@/type/enums";

export default defineComponent({
  setup() {
    const store = useStore();

    store.dispatch(StoreAction.restoreSession);
    return {
      isHome: RouteNames.HOME,
    };
  },
});
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <div :class="[route.name === isHome ? 'home' : 'page']">
      <component :is="Component" :key="route.path" />
    </div>
  </router-view>
</template>

<style lang="postcss" >
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .page {
    @apply container max-h-full flex flex-col;
  }

  .navbar {
    @apply p-4 flex gap-2 bg-gray-800;
  }

  .main {
    @apply flex-1 flex flex-col items-stretch overflow-hidden;
  }

  .input {
    @apply block w-full mx-auto px-3 py-2;
    @apply sm:text-sm text-gray-900 placeholder-gray-500;
    @apply rounded-md border-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10;
    @apply appearance-none focus:outline-none;
  }

  .button {
    @apply py-2 px-4;
    @apply font-medium text-white;
    @apply bg-indigo-600 hover:bg-indigo-700;
    @apply border border-transparent rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
    @apply focus:outline-none;
  }
}
</style>