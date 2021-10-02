<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { mapActions } from "vuex";
import AppButton from "@/components/AppButton.vue";
import { useAppStore } from "@/store/Store";
import { Roles, RouteNames, StoreActions } from "@/type/enums";
import {
  LogoutIcon,
  ChatIcon,
  AdjustmentsIcon,
  ChatAlt2Icon,
} from "@heroicons/vue/solid";

export default defineComponent({
  components: {
    AppButton,
    LogoutIcon,
    ChatIcon,
    AdjustmentsIcon,
    ChatAlt2Icon,
  },
  setup() {
    const store = useAppStore();
    const route = useRoute();

    return {
      route,
      userRole: computed(() => store.state.user.role),
      roleAdmin: Roles.ADMIN,
      routeChat: RouteNames.DASHBOARD_CHAT,
      isCurrentRoute(link: string) {
        return route.fullPath === link;
      },
      ...mapActions({
        logout: StoreActions.logOff,
      }),
    };
  },
});
</script>

<template>
  <div class="navbar">
    <router-link
      v-if="userRole === roleAdmin"
      to="/dashboard/admin"
      class="navbar-link"
      :class="{ 'bg-primary-dark': isCurrentRoute('/dashboard/admin') }"
    >
      {{ "Admin" }}
      <AdjustmentsIcon class="w-6 h-6" />
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
  <router-view />
</template>

<style lang="postcss">
.navbar {
  @apply p-4 flex gap-2 bg-primary;
}

.navbar-link {
  @apply inline-flex justify-center gap-2 py-2 px-4;
  @apply font-medium text-white text-center;
  @apply rounded-md hover:bg-primary-light focus:outline-none;
}
</style>