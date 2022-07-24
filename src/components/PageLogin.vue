<template>
  <HomeForm @submit="onSubmit">
    <div></div>
    <AppInputError v-if="isLoginRejected">
      {{ "Login error" }}
    </AppInputError>
    <div>
      <AppInputError v-if="errors.username">
        {{ errors.username }}
      </AppInputError>
      <AppInput v-model="username" placeholder="Username" />
    </div>
    <div>
      <AppInputError v-if="errors.password">
        {{ errors.password }}</AppInputError
      >
      <AppInput v-model="password" placeholder="Password" type="password" />
    </div>
    <AppButton title="Sign in" type="submit" :disabled="isSubmitting">
      <LoginIcon class="h-6 w-6" />
    </AppButton>
    <AppButton title="Go Back" @click="goBack" />
  </HomeForm>
</template>

<script lang="ts" setup>
  import { computed } from "vue"
  import { useRouter } from "vue-router"
  import { LoginIcon } from "@heroicons/vue/outline"
  import { useForm, useField } from "vee-validate"
  import { object, string } from "yup"
  import AppButton from "@/components/AppButton.vue"
  import AppInput from "@/components/AppInput.vue"
  import AppInputError from "@/components/AppInputError.vue"
  import HomeForm from "@/components/HomeForm.vue"
  import { useUserStore } from "@/store/StoreUser"

  const user = useUserStore()
  const router = useRouter()

  const isLoginRejected = computed(() => user.isLoginRejected)

  const { errors, isSubmitting, handleSubmit } = useForm({
    validationSchema: object({
      username: string().required("Username is required"),
      password: string()
        .required("Password is required")
        .min(4, "Password must be at least 4 characters"),
    }),
  })

  const { value: username } = useField<string>("username")
  const { value: password } = useField<string>("password")

  const onSubmit = handleSubmit((payload, { resetForm }) => {
    user.userSignIn(payload)
    resetForm()
  })

  const goBack = router.back
</script>
