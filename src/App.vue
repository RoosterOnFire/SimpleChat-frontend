<script lang="ts">
import { defineComponent } from "vue";
import { useAppStore } from "@/store/Store";
import { StoreAction, RouteNames } from "@/type/enums";

export default defineComponent({
  setup() {
    const store = useAppStore();

    store.dispatch(StoreAction.signIn);

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
.home {
  @apply flex flex-col items-center justify-center space-y-8;
}

.page {
  @apply max-h-full flex flex-col;
}
</style>
