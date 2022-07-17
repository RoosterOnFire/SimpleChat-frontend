<template>
  <h2 class="text-5xl font-bold text-primary">{{ "Simple Chat" }}</h2>
  <AppButton v-if="isHomeMain" title="Sign in" @click="goToLogin">
    <LoginIcon class="h-6 w-6" />
  </AppButton>
  <AppButton v-if="isHomeMain" title="Register" @click="gotToRegistration">
    <SparklesIcon class="h-6 w-6" />
  </AppButton>
  <router-view />
</template>

<script lang="ts" setup>
  import AppButton from "@/components/AppButton.vue"
  import { RouteNames } from "@/types/TypeEnums"
  import { LoginIcon, SparklesIcon } from "@heroicons/vue/outline"
  import { computed } from "vue"
  import { useRouter } from "vue-router"

  const router = useRouter()

  const isHomeMain = computed(
    () => router.currentRoute.value.name === RouteNames.home
  )

  function goToLogin() {
    router.push(RouteNames.login)
  }

  function gotToRegistration() {
    router.push(RouteNames.registration)
  }
</script>
