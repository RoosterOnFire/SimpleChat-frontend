<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { mapActions } from "vuex";
import AppButton from "@/components/AppButton.vue";
import { useStore } from "@/store/Store";
import { Roles, StoreAction } from "@/type/enums";

export default defineComponent({
  components: { AppButton },
  setup() {
    const store = useStore();
    const route = useRoute();

    return {
      route,
      userRole: computed(() => store.state.user.role),
      roleAdmin: Roles.ADMIN,
      isCurrentRoute(link: string) {
        return route.fullPath === link;
      },
      ...mapActions({
        logout: StoreAction.logOff,
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
      :class="{ 'bg-primary-900': isCurrentRoute('/dashboard/admin') }"
    >
      {{ "Admin" }}
    </router-link>
    <router-link
      to="/dashboard/chat"
      class="navbar-link"
      :class="{ 'bg-primary-900': isCurrentRoute('/dashboard/chat') }"
    >
      {{ "Chat" }}
    </router-link>
    <button type="button" class="navbar-link ml-auto" @click="logout()">
      {{ "Logout" }}
    </button>
  </div>
  <div class="main">
    <router-view />
  </div>
</template>

<style lang="postcss">
.navbar {
  @apply p-4 flex gap-2 bg-primary-800;
}

.navbar-link {
  @apply py-2 px-4;
  @apply font-medium text-white text-center;
  @apply rounded-md hover:bg-primary-600 focus:outline-none;
}

.main {
  @apply flex-1 flex flex-col items-stretch overflow-hidden;
}
</style>