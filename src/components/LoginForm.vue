<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store/Store";
import AppButton from "@/components/AppButton.vue";
import { StoreAction, StoreCommit, StoreGetter } from "@/type/enums";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default defineComponent({
  components: {
    AppButton,
  },
  setup() {
    const store = useStore();

    return {
      username: computed({
        get: () => store.state.user.username,
        set: (username) => store.commit(StoreCommit.updateUsername, username),
      }),
      password: computed({
        get: () => store.state.user.password,
        set: (password) => store.commit(StoreCommit.updatePassword, password),
      }),
      ...mapGetters([StoreGetter.isValidSignIn]),
      ...mapMutations([StoreCommit.resetIsValidSignIn]),
      ...mapActions([StoreAction.signIn]),
    };
  },
});
</script>

<template>
  <form class="login-form" @submit.prevent @click="resetIsValidSignIn()">
    <input
      type="text"
      class="input"
      :class="{ 'input--invalid': isValidSignIn() }"
      placeholder="Username"
      required
      v-model="username"
    />
    <input
      type="password"
      class="input"
      :class="{ 'input--invalid': isValidSignIn() }"
      placeholder="Password"
      required
      v-model="password"
    />
    <AppButton title="Sign in" @click="signIn()" />
  </form>
</template>

<style lang="postcss">
.login-form {
  @apply w-1/3 space-y-4 flex flex-col;
}

.input--invalid {
  @apply border-red-600;
}
</style>
