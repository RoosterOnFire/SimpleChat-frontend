<template>
  <HomeForm @submit="register">
    <div>
      <AppInputError v-if="errors.username">
        {{ errors.username }}
      </AppInputError>
      <AppInput v-model="username" type="text" placeholder="Username" />
    </div>
    <div>
      <AppInputError v-if="errors.password">
        {{ errors.password }}
      </AppInputError>
      <AppInput v-model="password" type="password" placeholder="Password" />
    </div>
    <div>
      <AppInputError v-if="errors.passwordRepeat">
        {{ errors.passwordRepeat }}
      </AppInputError>
      <AppInput
        v-model="passwordRepeat"
        type="password"
        placeholder="Repeat password"
      />
    </div>
    <AppButton title="Join" type="submit">
      <SparklesIcon class="h-6 w-6" />
    </AppButton>
    <AppButton title="Go Back" @click="goBack" />
  </HomeForm>
</template>

<script lang="ts" setup>
  import AppButton from "@/components/AppButton.vue"
  import AppInput from "@/components/AppInput.vue"
  import AppInputError from "@/components/AppInputError.vue"
  import HomeForm from "@/components/HomeForm.vue"
  import { useUserStore } from "@/store/StoreUser"
  import { SparklesIcon } from "@heroicons/vue/outline"
  import { useField, useForm } from "vee-validate"
  import { useRouter } from "vue-router"
  import { object, ref as yupRef, string } from "yup"

  const user = useUserStore()
  const router = useRouter()

  const { errors, handleSubmit } = useForm({
    validationSchema: object({
      username: string().required("Username is required"),
      password: string()
        .required("Password is required")
        .min(4, "Must be at least 4 characters"),
      passwordRepeat: string()
        .required("Repeated password is required")
        .oneOf([yupRef("password"), null], "Must match password"),
    }),
  })

  const { value: username } = useField<string>("username")
  const { value: password } = useField<string>("password")
  const { value: passwordRepeat } = useField<string>("passwordRepeat")

  const register = handleSubmit(({ username, password }) => {
    if (username && password) {
      user.register({ username, password })
    }
  })

  const goBack = router.back
</script>
