<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapMutations } from "vuex";
import { LoginIcon } from "@heroicons/vue/outline";
import { StoreActions, StoreMutations } from "@/type/enums";
import { useAppStore } from "@/store/Store";
import AppButton from "@/components/AppButton.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    AppButton,
    LoginIcon,
  },
  setup() {
    const store = useAppStore();
    const router = useRouter();

    return {
      username: "",
      password: "",
      isValidSignIn: store.getters.isValidSignIn,
      goBack: () => {
        router.back();
      },
      ...mapMutations([StoreMutations.resetIsValidSignIn]),
      ...mapActions([StoreActions.signIn]),
    };
  },
});
</script>

<template>
  <form class="form-home" @submit.prevent @click="resetIsValidSignIn()">
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
    <AppButton title="Go Back" @click="goBack" />
  </form>
</template>