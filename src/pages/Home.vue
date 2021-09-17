<script lang="ts">
import { defineComponent } from "vue";
import HomeForm from "@/components/HomeForm.vue";

export default defineComponent({
  components: { HomeForm },
  setup() {},
});
</script>

<template>
  <h1 class="header">Simple Chat</h1>
  <HomeForm />
</template>

<style lang="postcss" scoped>
.header {
  @apply text-5xl font-bold text-indigo-600;
}
</style>