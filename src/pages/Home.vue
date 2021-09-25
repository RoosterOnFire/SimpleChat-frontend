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
  <h1 class="header">Simple Chat</h1>
  <LoginForm />
  <p class="text-2xl font-bold text-indigo-600">{{ "OR" }}</p>
  <AppAdminLogin />
</template>

<style lang="postcss" scoped>
.header {
  @apply text-5xl font-bold text-indigo-600;
}
</style>