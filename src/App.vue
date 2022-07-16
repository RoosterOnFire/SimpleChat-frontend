<template>
  <router-view v-slot="{ Component }">
    <div
      v-if="loading"
      class="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 translate-y-1/2"
    >
      <SvgLoading />
    </div>
    <div
      v-else
      class="flex-1"
      :class="[
        isHome
          ? 'flex flex-col items-center justify-center gap-8'
          : 'flex max-h-full flex-col',
      ]"
    >
      <component :is="Component" :key="route.path" />
    </div>
  </router-view>
</template>

<script lang="ts" setup>
  import { computed } from "vue"
  import { useRoute } from "vue-router"
  import { useUserStore } from "@/store/StoreUser"
  import SvgLoading from "@/components/SvgLoading.vue"

  const user = useUserStore()
  const route = useRoute()

  user.sessionRestore()

  const loading = computed(() => user.isLoading)
  const isHome = computed(() => route.name?.toString().startsWith("home"))
</script>
