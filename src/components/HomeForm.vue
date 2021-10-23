<script lang="ts">
import { computed, defineComponent } from "vue";
import { mapActions, mapMutations } from "vuex";
import { LoginIcon } from "@heroicons/vue/outline";
import { StoreActions, StoreMutations } from "@/type/enums";
import { useAppStore } from "@/store/Store";
import AppButton from "@/components/AppButton.vue";

export default defineComponent({
  components: {
    AppButton,
    LoginIcon,
  },
  setup() {
    const store = useAppStore();

    return {
      username: "",
      password: "",
      isValidSignIn: store.getters.isValidSignIn,
      ...mapMutations([StoreMutations.resetIsValidSignIn]),
      ...mapActions([StoreActions.signIn]),
    };
  },
});
</script>

<template>
  <form class="login-form" @submit.prevent @click="resetIsValidSignIn()">
    <input
      type="text"
      class="input"
      :class="{ 'border-error': isValidSignIn }"
      placeholder="Username"
      required
      v-model="username"
    />
    <input
      type="password"
      class="input"
      :class="{ 'border-error': isValidSignIn }"
      placeholder="Password"
      required
      v-model="password"
    />
    <AppButton title="Sign in" @click="signIn({ username, password })">
      <LoginIcon class="h-6 w-6" />
    </AppButton>
  </form>
</template>

<style lang="postcss">
.login-form {
  @apply w-2/3 md:w-1/3 flex flex-col gap-4;
}
</style>>
