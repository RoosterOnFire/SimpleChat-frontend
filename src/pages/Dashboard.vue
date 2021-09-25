<script lang="ts">
import { computed, defineComponent } from "vue";
import AppButton from "@/components/AppButton.vue";
import { useStore } from "@/store/Store";
import { Roles, StoreAction } from "@/type/enums";

export default defineComponent({
  components: { AppButton },
  setup() {
    const store = useStore();

    return {
      userRole: computed(() => store.state.user.role),
      roleAdmin: Roles.ADMIN,
      logout() {
        store.dispatch(StoreAction.logOff);
      },
    };
  },
});
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-top">
      <router-link
        v-if="userRole === roleAdmin"
        to="/dashboard/admin"
        class="dashboard-sidebar-row"
      >
        {{ "Admin" }}
      </router-link>
      <router-link to="/dashboard/chat" class="dashboard-sidebar-row">
        {{ "Chat" }}
      </router-link>
    </div>
    <div class="sidebar-bottom">
      <button
        type="button"
        class="dashboard-sidebar-row mt-auto"
        @click="logout"
      >
        {{ "Logout" }}
      </button>
    </div>
  </div>
  <div class="main">
    <router-view />
  </div>
</template>

<style lang="postcss">
.dashboard-sidebar-row {
  @apply py-2 px-4;
  @apply font-medium text-white text-center;
  @apply bg-indigo-700 hover:bg-indigo-900;
  @apply border border-transparent rounded-md;
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
}

.dashboard-sidebar-row:last-child {
  @apply mt-auto;
}
</style>