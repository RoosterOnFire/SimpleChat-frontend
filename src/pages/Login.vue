<script lang="ts">
import { defineComponent } from "vue";
import LoginForm from "@/components/LoginForm.vue";

export default defineComponent({
  components: { LoginForm },
  setup() {},
});
</script>

<template>
  <h1 class="header">Simple Chat</h1>
  <LoginForm />
</template>

<style lang="postcss" scoped>
.header {
  @apply text-5xl font-bold text-indigo-600;
}
</style>