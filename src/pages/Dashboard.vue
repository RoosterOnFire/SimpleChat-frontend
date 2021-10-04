<script lang="ts">
import { defineComponent } from "vue";

import DashboardNav from "@/components/DashboardNav.vue";

export default defineComponent({
  components: {
    DashboardNav,
  },
  setup() {},
});
</script>

<template>
  <DashboardNav />
  <router-view />
</template>

<style lang="postcss">
</style>