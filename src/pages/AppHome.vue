<template>
  <h1 class="home-header">Simple Chat</h1>
  <AppButton v-if="isHomeMain" title="Sign in" @click="goToLogin">
    <LoginIcon class="h-6 w-6" />
  </AppButton>
  <AppButton v-if="isHomeMain" title="Register" @click="gotToRegistration">
    <SparklesIcon class="h-6 w-6" />
  </AppButton>
  <router-view />
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue"
  import { useRouter } from "vue-router"
  import { LoginIcon } from "@heroicons/vue/outline"
  import { SparklesIcon } from "@heroicons/vue/outline"
  import AppButton from "@/components/AppButton.vue"
  import { RouteNames } from "@/type/TypeEnums"

  export default defineComponent({
    components: { AppButton, LoginIcon, SparklesIcon },
    setup() {
      const router = useRouter()

      return {
        isHomeMain: computed(
          () => router.currentRoute.value.name === RouteNames.HOME
        ),
        goToLogin: () => {
          router.push(RouteNames.HOME_LOGIN)
        },
        gotToRegistration: () => {
          router.push(RouteNames.HOME_REGISTRATION)
        },
      }
    },
  })
</script>

<style lang="postcss">
  .home-header {
    @apply text-5xl font-bold text-primary;
  }
</style>
