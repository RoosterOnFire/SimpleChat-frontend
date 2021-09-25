<script lang="ts">
import { defineComponent } from "vue";
import AdminUsersTable from "@/components/AppUsersTable.vue";

export default defineComponent({
  components: { AdminUsersTable },
  setup() {},
});
</script>


<template>
  <div class="admin">
    <AdminUsersTable />
  </div>
</template>


<style lang="postcss">
.admin {
  @apply p-4;
}
</style>