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

<script lang="ts" setup>
  import DashboardNavLink from "@/components/DashboardNavLink.vue"
  import { useUserStore } from "@/store/StoreUser"
  import { ChatAlt2Icon, ChatIcon, LogoutIcon } from "@heroicons/vue/solid"
  import { useRoute } from "vue-router"

  const user = useUserStore()
  const route = useRoute()

  const logout = user.userLogout

  function isCurrentRoute(link: string) {
    return route.fullPath === link
  }
</script>

<style lang="postcss">
  .navbar-link {
    @apply inline-flex justify-center gap-2 rounded-md px-4 py-2 text-center align-baseline font-medium text-white hover:bg-primary-dark focus:outline-none;
  }

  .test {
    @apply bg-red-600;
  }
</style>
