<template>
  <router-view v-slot="{ Component, route }">
    <div
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

<script lang="ts">
  import { computed, defineComponent } from "vue"
  import { useRoute } from "vue-router"
  import { useUserStore } from "@/store/StoreUser"

  export default defineComponent({
    setup() {
      const user = useUserStore()
      const route = useRoute()

      user.sessionRestore()

      return {
        isHome: computed(() => {
          return route.name?.toString().startsWith("home")
        }),
      }
    },
  })
</script>
