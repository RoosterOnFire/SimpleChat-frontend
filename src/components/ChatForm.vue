<template>
  <form
    class="chat-form"
    @submit.prevent="sendMessage"
    @keypress.enter.prevent="sendMessage"
  >
    <input v-model="newMessage" type="text" class="input" />
    <AppButton title="Send" type="submit">
      <MailIcon class="w-6 h-6" />
    </AppButton>
  </form>
</template>

<script lang="ts">
  import { useAppStore } from "@/store/Store"
  import { defineComponent, ref } from "vue"
  import AppButton from "@/components/AppButton.vue"
  import { StoreActions } from "@/type/TypeEnums"
  import { MailIcon } from "@heroicons/vue/outline"

  export default defineComponent({
    components: {
      AppButton,
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

<style lang="postcss">
  .chat-form {
    @apply p-4 flex justify-around gap-4 bg-primary;
  }
</style>
