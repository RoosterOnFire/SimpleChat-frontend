<template>
  <form class="form-home" @submit="register">
    <span v-if="errors.username" class="text-error">{{ errors.username }}</span>
    <input
      type="text"
      class="input"
      placeholder="Username"
      required
      v-model="username"
    />
    <span v-if="errors.password" class="text-error">{{ errors.password }}</span>
    <input
      type="password"
      class="input"
      placeholder="Password"
      required
      v-model="password"
    />
    <span v-if="errors.passwordRepeat" class="text-error">{{
      errors.passwordRepeat
    }}</span>
    <input
      type="password"
      class="input"
      placeholder="Repeat password"
      required
      v-model="passwordRepeat"
    />
    <AppButton title="Join" type="submit">
      <SparklesIcon class="h-6 w-6" />
    </AppButton>
    <AppButton title="Go Back" @click="goBack" />
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useForm, useField } from "vee-validate";
import { object, string, ref as yupRef } from "yup";
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

    const validationSchema = object({
      username: string().required("Username is required"),
      password: string().required().min(4, "Must be at least 4 characters"),
      passwordRepeat: string()
        .required()
        .oneOf([yupRef("password"), null], "Must match password"),
    });
    const { errors, meta, isSubmitting, handleSubmit } = useForm({
      validationSchema,
    });

    const { value: username } = useField("username");
    const { value: password } = useField("password");
    const { value: passwordRepeat } = useField("passwordRepeat");

    return {
      username,
      password,
      passwordRepeat,
      errors,
      meta,
      isSubmitting,
      register: handleSubmit((payload) =>
        store.dispatch(StoreActions.register, payload)
      ),
      goBack: () => router.back(),
    };
  },
});
</script>
