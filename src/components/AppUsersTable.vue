<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store/Store";
import { User, Users } from "@/type/Data";
import AppButton from "@/components/AppButton.vue";

export default defineComponent({
  components: { AppButton },
  setup() {
    const store = useStore();

    return {
      currectUser: computed<User>(() => store.state.user),
      users: computed<Users>(() => store.state.users),
      kickUser(userId: string) {
        store.dispatch("kickUser", userId);
      },
    };
  },
});
</script>

<template>
  <div class="table-container">
    <table class="table">
      <thead class="table-headers">
        <tr>
          <th scope="col" class="table-header">Name</th>
          <th scope="col" class="table-header">Status</th>
          <th scope="col" class="table-header">Role</th>
          <th scope="col" class="relative px-6 py-3">
            <span class="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <template v-for="user of users" :key="user.userId" :user="user">
          <tr>
            <td class="row-base">
              <p>{{ user.username }}</p>
            </td>
            <td class="row-base">
              <span class="row-status-active">{{ "Active" }}</span>
            </td>
            <td class="row-base row-role">{{ "UNKNOWN" }}</td>
            <td class="row-base text-right text-sm font-medium">
              <AppButton
                v-if="user.userId !== currectUser.userId"
                title="Kick"
                @click="kickUser(user.userId)"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style lang="postcss" scoped>
.table-container {
  @apply flex flex-col shadow overflow-hidden border-b border-gray-200 sm:rounded-lg;
}

.table {
  @apply min-w-full divide-y divide-gray-200;
}

.table-headers {
  @apply bg-gray-50;
}

.table-header {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}

.user-cell {
  @apply flex justify-center items-center gap-x-8;
}

.row-base {
  @apply px-6 py-4 whitespace-nowrap;
}

.row-status-active {
  @apply px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800;
}

.row-role {
  @apply text-sm text-gray-500;
}
</style>