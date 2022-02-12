<template>
  <form
    class="flex justify-around gap-4 bg-primary p-4"
    @submit.prevent="sendMessage"
    @keypress.enter.prevent="sendMessage"
  >
    <AppInput v-model="newMessage" />
    <AppButton title="Chat" type="submit">
      <MailIcon class="h-6 w-6" />
    </AppButton>
  </form>
</template>

<script lang="ts">
  import { useAppStore } from "@/store/Store"
  import { defineComponent, ref } from "vue"
  import AppButton from "@/components/AppButton.vue"
  import AppInput from "@/components/AppInput.vue"
  import { StoreActions } from "@/type/TypeEnums"
  import { MailIcon } from "@heroicons/vue/outline"

  export default defineComponent({
    components: {
      AppButton,
      AppInput,
      MailIcon,
    },
    setup() {
      const store = useAppStore()
      const newMessage = ref("")

      return {
        newMessage,
        sendMessage() {
          if (!newMessage.value) {
            return
          }

          store.dispatch(StoreActions.messagesAdd, {
            message: newMessage.value,
          })

          newMessage.value = ""
        },
      }
    },
  })
</script>
