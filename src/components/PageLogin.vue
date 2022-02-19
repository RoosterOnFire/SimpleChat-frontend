<template>
  <HomeForm @submit="onSubmit">
    <AppInputError v-if="errorsInvalidSignIn">
      {{ "Login error" }}
    </AppInputError>
    <AppInputError v-if="errors.username">{{ errors.username }}</AppInputError>
    <AppInput v-model="username" placeholder="Username" />
    <AppInputError v-if="errors.password">{{ errors.password }}</AppInputError>
    <AppInput v-model="password" placeholder="Password" type="password" />
    <AppButton title="Sign in" type="submit" :disabled="isSubmitting">
      <LoginIcon class="h-6 w-6" />
    </AppButton>
    <AppButton title="Go Back" @click="goBack" />
  </HomeForm>
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import { useRouter } from "vue-router"
  import { LoginIcon } from "@heroicons/vue/outline"
  import { useForm, useField } from "vee-validate"
  import { object, string } from "yup"
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
      LoginIcon,
    },
    setup() {
      const user = useUserStore()
      const router = useRouter()

      const validationSchema = object({
        username: string().required("Username is required"),
        password: string().required("Password is required").min(4),
      })
      const { errors, isSubmitting, handleSubmit } = useForm({
        validationSchema,
      })

      const { value: username } = useField("username")
      const { value: password } = useField("password")

      return {
        username,
        password,
        errors,
        isSubmitting,
        goBack: () => router.back(),
        onSubmit: handleSubmit((payload) => {
          user.userSignIn(payload)
        }),
        errorsInvalidSignIn: user.errorsInvalidSignIn,
      }
    },
  })
</script>
