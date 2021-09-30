<script lang="ts">
import { defineComponent } from "vue";
import LoginForm from "@/components/LoginForm.vue";

export default defineComponent({
  components: { LoginForm },
  setup() {},
});
</script>

<template>
  <h1 class="home-header">Simple Chat</h1>
  <LoginForm />
</template>

<style lang="postcss">
.home {
  @apply container flex flex-col items-center justify-center space-y-8;
}

.home-header {
  @apply text-5xl font-bold text-primary-800;
}
</style>