<template>
  <div class="flex gap-2 bg-primary p-4">
    <DashboardNavLink
      to="/dashboard/rooms"
      :class="{ 'bg-primary-dark': isCurrentRoute('/dashboard/rooms') }"
    >
      {{ "Rooms" }}
      <ChatAlt2Icon class="h-6 w-6" />
    </DashboardNavLink>
    <DashboardNavLink
      to="/dashboard/chat"
      :class="{ 'bg-primary-dark': isCurrentRoute('/dashboard/chat') }"
    >
      {{ "Chat" }}
      <ChatIcon class="h-6 w-6" />
    </DashboardNavLink>
    <DashboardNavLink type="button" class="ml-auto" @click="logout()">
      {{ "Logout" }}
      <LogoutIcon class="h-6 w-6" />
    </DashboardNavLink>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue"
  import { useRoute } from "vue-router"
  import { RouteNames } from "@/types/TypeEnums"
  import { LogoutIcon, ChatIcon, ChatAlt2Icon } from "@heroicons/vue/solid"
  import { useUserStore } from "@/store/StoreUser"
  import DashboardNavLink from "@/components/DashboardNavLink.vue"

  export default defineComponent({
    components: {
      LogoutIcon,
      ChatIcon,
      ChatAlt2Icon,
      DashboardNavLink,
    },
    setup() {
      const user = useUserStore()
      const route = useRoute()

      return {
        route,
        userRole: computed(() => user.data.role),
        routeChat: RouteNames.dashboard_chat,
        isCurrentRoute(link: string) {
          return route.fullPath === link
        },
        logout: user.userLogout,
      }
    },
  })
</script>

<style lang="postcss">
  .navbar-link {
    @apply inline-flex justify-center gap-2 rounded-md px-4 py-2 text-center align-baseline font-medium text-white hover:bg-primary-dark focus:outline-none;
  }

  .test {
    @apply bg-red-600;
  }
</style>
