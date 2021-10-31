<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { LoginIcon } from "@heroicons/vue/outline";
import { StoreActions, StoreGetters, StoreMutations } from "@/type/TypeEnums";
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
      goBack: () => {
        router.back();
      },
      ...mapGetters([StoreGetters.errorsInvalidSignIn]),
      ...mapMutations([StoreMutations.resetInvalidSignIn]),
      ...mapActions([StoreActions.signIn]),
    };
  },
});
</script>

<template>
  <form class="form-home">
    <input
      type="text"
      class="input"
      :class="{ 'text-error': errorsInvalidSignIn() }"
      placeholder="Username"
      required
      v-model="username"
      @click="resetInvalidSignIn"
    />
    <input
      type="password"
      class="input"
      :class="{ 'text-error': errorsInvalidSignIn() }"
      placeholder="Password"
      required
      v-model="password"
      @click="resetInvalidSignIn"
    />
    <AppButton title="Sign in" @click="signIn({ username, password })">
      <LoginIcon class="h-6 w-6" />
    </AppButton>
    <AppButton title="Go Back" @click="goBack" />
  </form>
</template>