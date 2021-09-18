<script lang="ts">
import { useStore } from "@/store/Store";
import { computed } from "@vue/reactivity";
import { User } from "@/type/Data";
import AdminKickUser from "@/components/AdminKickUser.vue";
export default {
  components: { AdminKickUser },
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
  <div class="kick-users">
    <AdminKickUser v-for="user in users" :key="user.userId" :user="user" />
  </div>
</template>

<style lang="postcss" scoped>
.kick-users {
  @apply flex flex-col gap-y-4;
}
</style>