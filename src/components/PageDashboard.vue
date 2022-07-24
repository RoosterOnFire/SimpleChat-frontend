<template>
  <DashboardNav />
  <div class="flex flex-1">
    <DashboardSidebar class="w-52" />
    <router-view />
  </div>
</template>

<script lang="ts" setup>
  import DashboardNav from "@/components/DashboardNav.vue"
  import DashboardSidebar from "@/components/DashboardSidebar.vue"
</script>
