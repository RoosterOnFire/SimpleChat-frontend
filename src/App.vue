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
  import { useAppStore } from "@/store/Store"
  import { StoreActions } from "@/type/TypeEnums"

  export default defineComponent({
    setup() {
      const store = useAppStore()
      const route = useRoute()

      store.dispatch(StoreActions.sessionRestore)

      return {
        isHome: computed(() => {
          return route.name?.toString().startsWith("home")
        }),
      }
    },
  })
</script>
