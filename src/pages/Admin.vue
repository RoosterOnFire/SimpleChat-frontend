<script lang="ts">
import { useStore } from "@/store/Store";
import { computed } from "@vue/reactivity";
import { User } from "@/type/Data";
import AppButton from "@/components/AppButton.vue";
import AdminKickUser from "@/components/AdminKickUser.vue";
export default {
  components: { AppButton, AdminKickUser },
  name: "Admin",
  setup() {
    const store = useStore();

    return {
      users: computed<User[]>(() => store.state.users),
    };
  },
};
</script>

<template>
  <div class="sidebar"></div>
  <div class="main">
    <AdminKickUser v-for="user in users" :key="user.userId" :user="user" />
  </div>
</template>

<style lang="postcss" scoped>
</style>