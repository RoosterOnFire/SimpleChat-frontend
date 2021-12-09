<template>
  <form class="form-home">
    <label v-if="errorsInvalidSignIn()" for="username" class="text-error">
      {{ "Username invalid" }}
    </label>
    <input
      id="username"
      type="text"
      class="input"
      placeholder="Username"
      required
      v-model="username"
    />
    <label v-if="errorsInvalidSignIn()" for="password" class="text-error">
      {{ "Password invalid" }}
    </label>
    <input
      id="password"
      type="password"
      class="input"
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

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { LoginIcon } from "@heroicons/vue/outline";
import { StoreActions, StoreGetters } from "@/type/TypeEnums";
import AppButton from "@/components/AppButton.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    AppButton,
    LoginIcon,
  },
  setup() {
    const router = useRouter();

    return {
      username: "",
      password: "",
      goBack: () => {
        router.back();
      },
      ...mapGetters([StoreGetters.errorsInvalidSignIn]),
      ...mapActions([StoreActions.signIn]),
    };
  },
});
</script>
