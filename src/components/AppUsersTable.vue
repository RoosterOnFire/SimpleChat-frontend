<script lang="ts">
import { defineComponent } from "vue";
import AppButton from "@/components/AppButton.vue";
import { StoreActions, StoreGetters } from "@/type/enums";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  components: { AppButton },
  setup() {
    return {
      ...mapGetters([StoreGetters.isCurrentUser, StoreGetters.users]),
      ...mapActions([StoreActions.kickUser]),
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
      <tbody class="table-body">
        <template v-for="user of users()" :key="user.userId" :user="user">
          <tr>
            <td class="row-base">
              <p>{{ user.username }}</p>
            </td>
            <td class="row-base">
              <span class="row-status-active">{{ "Active" }}</span>
            </td>
            <td class="row-base row-role">{{ user.role }}</td>
            <td class="row-base text-right text-sm font-medium">
              <AppButton
                v-if="!isCurrentUser()"
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

<style lang="postcss">
.table-container {
  @apply flex flex-col bg-gray-50 border-b border-primary sm:rounded-lg shadow overflow-hidden;
}

.table {
  @apply min-w-full divide-y divide-primary;
}

.table-headers {
  @apply bg-primary;
}

.table-header {
  @apply px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider;
}

.table-body {
  @apply bg-white divide-y divide-primary;
}

.user-cell {
  @apply flex justify-center items-center gap-x-8;
}

.row-base {
  @apply px-6 py-4 whitespace-nowrap;
}

.row-status-active {
  @apply px-2 inline-flex rounded-full bg-primary text-white text-xs font-semibold leading-5;
}

.row-role {
  @apply text-sm text-primary font-medium;
}
</style>