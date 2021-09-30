<script lang="ts">
import { defineComponent } from "vue";
import AppButton from "@/components/AppButton.vue";
import { StoreAction, StoreGetter } from "@/type/enums";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  components: { AppButton },
  setup() {
    return {
      ...mapGetters([StoreGetter.isCurrentUser, StoreGetter.users]),
      ...mapActions([StoreAction.kickUser]),
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
  @apply flex flex-col shadow overflow-hidden border-b border-primary-100 sm:rounded-lg;
}

.table {
  @apply min-w-full divide-y divide-primary-600;
}

.table-headers {
  @apply bg-primary-600;
}

.table-header {
  @apply px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider;
}

.table-body {
  @apply bg-white divide-y divide-primary-600;
}

.user-cell {
  @apply flex justify-center items-center gap-x-8;
}

.row-base {
  @apply px-6 py-4 whitespace-nowrap;
}

.row-status-active {
  @apply px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-700 text-white;
}

.row-role {
  @apply text-sm text-primary-700;
}
</style>