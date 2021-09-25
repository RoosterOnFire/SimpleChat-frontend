<script lang="ts">
import { computed, defineComponent } from "vue";
import AppButton from "@/components/AppButton.vue";
import { useStore } from "@/store/Store";
import { User } from "@/type/data";
import { StoreAction } from "@/type/enums";

export default defineComponent({
  components: { AppButton },
  setup() {
    const store = useStore();

    return {
      users: computed<User[]>(() => store.state.users),
      logout() {
        store.dispatch(StoreAction.logOff);
      },
    };
  },
});
</script>

<template>
  <div class="sidebar">
    <router-link to="/dashboard/chat" class="dashboard-sidebar-row"
      >Chat</router-link
    >
    <router-link to="/dashboard/admin" class="dashboard-sidebar-row"
      >Admin</router-link
    >
    <button type="button" class="dashboard-sidebar-row" @click="logout">
      Logout
    </button>
  </div>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<style lang="postcss">
.dashboard-sidebar-row {
  @apply py-2 px-4;
  @apply font-medium text-white text-center;
  @apply bg-indigo-600 hover:bg-indigo-700;
  @apply border border-transparent rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
  @apply focus:outline-none;
}

.dashboard-sidebar-row:last-child {
  margin-top: auto !important;
}
</style>