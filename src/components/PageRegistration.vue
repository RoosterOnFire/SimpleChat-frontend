<template>
  <HomeForm @submit="register">
    <AppInputError v-if="errors.username">{{ errors.username }}</AppInputError>
    <AppInput v-model="username" type="text" placeholder="Username" />
    <AppInputError v-if="errors.password">{{ errors.password }}</AppInputError>
    <AppInput v-model="password" type="password" placeholder="Password" />
    <AppInputError v-if="errors.passwordRepeat">{{
      errors.passwordRepeat
    }}</AppInputError>
    <AppInput
      v-model="passwordRepeat"
      type="password"
      placeholder="Repeat password"
    />
    <AppButton title="Join" type="submit">
      <SparklesIcon class="h-6 w-6" />
    </AppButton>
    <AppButton title="Go Back" @click="goBack" />
  </HomeForm>
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import { useRouter } from "vue-router"
  import { useForm, useField } from "vee-validate"
  import { object, string, ref as yupRef } from "yup"
  import { SparklesIcon } from "@heroicons/vue/outline"
  import AppButton from "@/components/AppButton.vue"
  import AppInput from "@/components/AppInput.vue"
  import AppInputError from "@/components/AppInputError.vue"
  import HomeForm from "@/components/HomeForm.vue"
  import { useUserStore } from "@/store/StoreUser"

  export default defineComponent({
    components: {
      AppButton,
      AppInput,
      AppInputError,
      HomeForm,
      SparklesIcon,
    },
    setup() {
      const user = useUserStore()
      const router = useRouter()

      const validationSchema = object({
        username: string().required("Username is required"),
        password: string()
          .required("Password is required")
          .min(4, "Must be at least 4 characters"),
        passwordRepeat: string()
          .required("Repeated password is required")
          .oneOf([yupRef("password"), null], "Must match password"),
      })
      const { errors, meta, isSubmitting, handleSubmit } = useForm({
        validationSchema,
      })

      const { value: username } = useField("username")
      const { value: password } = useField("password")
      const { value: passwordRepeat } = useField("passwordRepeat")

      return {
        username,
        password,
        passwordRepeat,
        errors,
        meta,
        isSubmitting,
        register: handleSubmit((payload) => {
          if (payload.username && payload.password) {
            user.register({
              username: payload.username,
              password: payload.password,
            })
          }
        }),
        goBack: () => router.back(),
      }
    },
  })
</script>
