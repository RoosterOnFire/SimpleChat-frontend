<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { SparklesIcon } from "@heroicons/vue/outline";
import AppButton from "@/components/AppButton.vue";
import { StoreActions } from "@/type/TypeEnums";
import { useAppStore } from "@/store/Store";

export default defineComponent({
  components: {
    AppButton,
    SparklesIcon,
  },
  setup() {
    const store = useAppStore();
    const router = useRouter();
    const username = ref("");
    const password = ref("");
    const passwordRepeat = ref("");
    const allowValidation = ref(false);
    const isPasswordValid = ref(true);

    return {
      username,
      password,
      passwordRepeat,
      allowValidation,
      isPasswordValid,
      resetIsPasswordValid: () => {
        allowValidation.value = false;
        isPasswordValid.value = true;
      },
      register: () => {
        allowValidation.value = true;
        isPasswordValid.value = password.value === passwordRepeat.value;

        if (isPasswordValid.value) {
          store.dispatch(StoreActions.register, {
            username: username.value,
            password: password.value,
          });
        }
      },
      goBack: () => {
        router.back();
      },
    };
  },
});
</script>

<template>
  <form class="form-home">
    <input
      type="text"
      class="input"
      :class="{
        'text-success': allowValidation && isPasswordValid,
      }"
      placeholder="Username"
      required
      v-model="username"
      @click="resetIsPasswordValid"
      @change="resetIsPasswordValid"
    />
    <input
      type="password"
      class="input"
      :class="{
        'text-error': !isPasswordValid,
        'text-success': allowValidation && isPasswordValid,
      }"
      placeholder="Password"
      required
      v-model="password"
      @click="resetIsPasswordValid"
      @change="resetIsPasswordValid"
    />
    <input
      type="password"
      class="input"
      :class="{
        'text-error': !isPasswordValid,
        'text-success': allowValidation && isPasswordValid,
      }"
      placeholder="Repeat password"
      required
      v-model="passwordRepeat"
      @click="resetIsPasswordValid"
      @change="resetIsPasswordValid"
    />
    <AppButton title="Join" @click="register">
      <SparklesIcon class="h-6 w-6" />
    </AppButton>
    <AppButton title="Go Back" @click="goBack" />
  </form>
</template>
