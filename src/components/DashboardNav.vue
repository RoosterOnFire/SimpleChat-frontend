<template>
  <div class="flex gap-2 bg-primary p-4">
    <router-link
      to="/dashboard/rooms"
      class="navbar-link"
      :class="{ 'bg-primary-dark': isCurrentRoute('/dashboard/rooms') }"
    >
      {{ "Rooms" }}
      <ChatAlt2Icon class="h-6 w-6" />
    </router-link>
    <router-link
      to="/dashboard/chat"
      class="navbar-link"
      :class="{ 'bg-primary-dark': isCurrentRoute('/dashboard/chat') }"
    >
      {{ "Chat" }}
      <ChatIcon class="h-6 w-6" />
    </router-link>
    <button type="button" class="navbar-link ml-auto" @click="logout()">
      {{ "Logout" }}
      <LogoutIcon class="h-6 w-6" />
    </button>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue"
  import { mapActions } from "vuex"
  import { useRoute } from "vue-router"
  import { RouteNames, StoreActions } from "@/type/TypeEnums"
  import { useAppStore } from "@/store/Store"
  import { LogoutIcon, ChatIcon, ChatAlt2Icon } from "@heroicons/vue/solid"

  export default defineComponent({
    components: {
      LogoutIcon,
      ChatIcon,
      ChatAlt2Icon,
    },
    setup() {
      const store = useAppStore()
      const route = useRoute()

      return {
        route,
        userRole: computed(() => store.state.user?.data.role),
        routeChat: RouteNames.DASHBOARD_CHAT,
        isCurrentRoute(link: string) {
          return route.fullPath === link
        },
        ...mapActions({
          logout: StoreActions.userLogout,
        }),
      }
    },
  })
</script>
