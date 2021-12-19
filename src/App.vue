<template>
  <router-view v-slot="{ Component, route }">
    <div class="container" :class="[isHome ? 'home' : 'page']">
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

      store.dispatch(StoreActions.signIn)

      return {
        isHome: computed(() => {
          return route.name?.toString().startsWith("home")
        }),
      }
    },
  })
</script>
