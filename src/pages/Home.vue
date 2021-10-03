<script lang="ts">
import { computed, defineComponent } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { StoreActions, StoreMutations, StoreGetters } from "@/type/enums";
import AppButton from "@/components/AppButton.vue";
import { useAppStore } from "@/store/Store";
import { LoginIcon } from "@heroicons/vue/outline";

export default defineComponent({
  components: {
    AppButton,
    LoginIcon,
  },
  setup() {
    const store = useAppStore();

    return {
      username: computed({
        get: () => store.state.user.username,
        set: (username) =>
          store.commit(StoreMutations.updateUsername, username),
      }),
      password: computed({
        get: () => store.state.user.password,
        set: (password) =>
          store.commit(StoreMutations.updatePassword, password),
      }),
      ...mapGetters([StoreGetters.isValidSignIn]),
      ...mapMutations([StoreMutations.resetIsValidSignIn]),
      ...mapActions([StoreActions.signIn]),
    };
  },
});
</script>

<template>
  <h1 class="home-header">Simple Chat</h1>
  <form class="login-form" @submit.prevent @click="resetIsValidSignIn()">
    <input
      type="text"
      class="input"
      :class="{ 'border-error': isValidSignIn() }"
      placeholder="Username"
      required
      v-model="username"
    />
    <input
      type="password"
      class="input"
      :class="{ 'border-error': isValidSignIn() }"
      placeholder="Password"
      required
      v-model="password"
    />
    <AppButton title="Sign in" @click="signIn()">
      <LoginIcon class="h-6 w-6" />
    </AppButton>
  </form>
</template>

<style lang="postcss">
.home-header {
  @apply text-5xl font-bold text-primary;
}

.login-form {
  @apply flex flex-col gap-4 w-2/3;
}
</style>