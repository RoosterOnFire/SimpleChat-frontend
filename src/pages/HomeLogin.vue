<template>
  <form class="form-home" @submit="onSubmit">
    <span v-if="errorsInvalidSignIn()" class="text-error">
      {{ "Login error" }}
    </span>
    <span v-if="errors.username" class="text-error">
      {{ errors.username }}
    </span>
    <input v-model="username" placeholder="Username" class="input" required />
    <span v-if="errors.password" class="text-error">{{ errors.password }}</span>
    <input
      v-model="password"
      type="password"
      class="input"
      placeholder="Password"
      required
    />
    <AppButton title="Sign in" type="submit" :disabled="isSubmitting">
      <LoginIcon class="h-6 w-6" />
    </AppButton>
    <AppButton title="Go Back" @click="goBack" />
  </form>
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import { mapGetters } from "vuex"
  import { useRouter } from "vue-router"
  import { LoginIcon } from "@heroicons/vue/outline"
  import { StoreActions, StoreGetters } from "@/type/TypeEnums"
  import { useForm, useField } from "vee-validate"
  import { object, string } from "yup"
  import AppButton from "@/components/AppButton.vue"
  import { useAppStore } from "@/store/Store"

  export default defineComponent({
    components: {
      AppButton,
      LoginIcon,
    },
    setup() {
      const store = useAppStore()
      const router = useRouter()

      const validationSchema = object({
        username: string().required(),
        password: string().required().min(4),
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
          store.dispatch(StoreActions.signIn, payload)
        }),
        ...mapGetters([StoreGetters.errorsInvalidSignIn]),
      }
    },
  })
</script>
