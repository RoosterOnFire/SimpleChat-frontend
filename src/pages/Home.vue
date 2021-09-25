<script lang="ts">
import { defineComponent } from "vue";
import LoginForm from "@/components/LoginForm.vue";
import AppAdminLogin from "@/components/AppAdminLogin.vue";

export default defineComponent({
  components: { LoginForm, AppAdminLogin },
  setup() {},
});
</script>

<template>
  <h1 class="home-header">Simple Chat</h1>
  <LoginForm />
  <p class="home-text">{{ "OR" }}</p>
  <AppAdminLogin />
</template>

<style lang="postcss">
.home-header {
  @apply text-5xl font-bold text-indigo-600;
}

.home-text {
  @apply text-2xl font-bold text-indigo-600;
}
</style>