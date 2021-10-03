<script lang="ts">
import { defineComponent } from "vue";
import AdminUsersTable from "@/components/AppUsersTable.vue";

export default defineComponent({
  components: { AdminUsersTable },
  setup() {},
});
</script>

<template>
  <div class="main p-4">
    <AdminUsersTable class="flex-1" />
  </div>
</template>
