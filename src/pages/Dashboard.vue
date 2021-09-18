<script lang="ts">
import AdminKickUser from "@/components/AdminKickUser.vue";
import AppButton from "@/components/AppButton.vue";
import { useStore } from "@/store/Store";
import { User } from "@/type/Data";
import { computed, defineComponent } from "vue";

export default defineComponent({
  components: { AdminKickUser, AppButton },
  name: "Dashboard",
  setup() {
    const store = useStore();

    return {
      users: computed<User[]>(() => store.state.users),
    };
  },
});
</script>

<template>
  <div class="sidebar">
    <router-link to="/dashboard/chat" class="sidebar-row">Chat</router-link>
    <router-link to="/dashboard/admin" class="sidebar-row">Admin</router-link>
    <router-link to="/" class="sidebar-row sidebar-row--bottom">
      Logout
    </router-link>
  </div>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<style lang="postcss" scoped>
.sidebar-row {
  @apply py-2 px-4;
  @apply font-medium text-white text-center;
  @apply bg-indigo-600 hover:bg-indigo-700;
  @apply border border-transparent rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
  @apply focus:outline-none;
}

.sidebar-row--bottom {
  margin-top: auto !important;
}
</style>