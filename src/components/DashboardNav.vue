<template>
  <div class="navbar">
    <router-link
      v-if="userRole === roleAdmin"
      to="/dashboard/admin"
      class="navbar-link"
      :class="{ 'bg-primary-dark': isCurrentRoute('/dashboard/admin') }"
    >
      {{ "Admin" }}
      <ServerIcon class="w-6 h-6" />
    </router-link>
    <router-link
      to="/dashboard/rooms"
      class="navbar-link"
      :class="{ 'bg-primary-dark': isCurrentRoute('/dashboard/rooms') }"
    >
      {{ "Rooms" }}
      <ChatAlt2Icon class="w-6 h-6" />
    </router-link>
    <router-link
      to="/dashboard/chat"
      class="navbar-link"
      :class="{ 'bg-primary-dark': isCurrentRoute('/dashboard/chat') }"
    >
      {{ "Chat" }}
      <ChatIcon class="w-6 h-6" />
    </router-link>
    <button type="button" class="navbar-link ml-auto" @click="logout()">
      {{ "Logout" }}
      <LogoutIcon class="w-6 h-6" />
    </button>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue"
  import { mapActions } from "vuex"
  import { useRoute } from "vue-router"
  import { Roles, RouteNames, StoreActions } from "@/type/TypeEnums"
  import { useAppStore } from "@/store/Store"
  import {
    LogoutIcon,
    ChatIcon,
    ServerIcon,
    ChatAlt2Icon,
  } from "@heroicons/vue/solid"

  export default defineComponent({
    components: {
      LogoutIcon,
      ChatIcon,
      ServerIcon,
      ChatAlt2Icon,
    },
    setup() {
      const store = useAppStore()
      const route = useRoute()

      return {
        route,
        userRole: computed(() => store.state.user?.data.role),
        roleAdmin: Roles.ADMIN,
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

<style lang="postcss">
  .navbar {
    @apply p-4 flex gap-2 bg-primary;
  }

  .navbar-link {
    @apply px-4 py-2 inline-flex justify-center align-baseline gap-2;
    @apply font-medium text-white text-center;
    @apply rounded-md hover:bg-primary-dark focus:outline-none;
  }
</style>
