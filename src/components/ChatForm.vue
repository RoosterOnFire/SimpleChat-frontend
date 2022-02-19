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
  import { defineComponent, ref } from "vue"
  import AppButton from "@/components/AppButton.vue"
  import AppInput from "@/components/AppInput.vue"
  import { MailIcon } from "@heroicons/vue/outline"
  import { useRoomsStore } from "@/store/StoreRooms"

  export default defineComponent({
    components: {
      AppButton,
      AppInput,
      MailIcon,
    },
    setup() {
      const rooms = useRoomsStore()
      const newMessage = ref("")

      return {
        newMessage,
        sendMessage() {
          if (!newMessage.value) {
            return
          }

          rooms.messagesAdd(newMessage.value)

          newMessage.value = ""
        },
      }
    },
  })
</script>
