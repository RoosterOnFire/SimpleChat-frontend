<script lang="ts">
import { defineComponent } from "vue";
import { useAppStore } from "@/store/Store";
import { StoreActions, RouteNames } from "@/type/enums";

export default defineComponent({
  setup() {
    const store = useAppStore();

    store.dispatch(StoreActions.signIn);

    return {
      isHome: RouteNames.HOME,
    };
  },
});
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <div class="container" :class="[route.name === isHome ? 'home' : 'page']">
      <component :is="Component" :key="route.path" />
    </div>
  </router-view>
</template>

<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

.home {
  @apply flex flex-col items-center justify-center space-y-8;
}

.page {
  @apply max-h-full flex flex-col;
}

.input {
  @apply block w-full mx-auto px-3 py-2;
  @apply sm:text-sm;
  @apply rounded-md border-2 border-primary focus:border-primary-dark;
  @apply focus:ring-1 focus:ring-primary-light focus:z-10;
  @apply appearance-none focus:outline-none;
}
</style>
