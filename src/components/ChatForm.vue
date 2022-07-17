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

<script lang="ts" setup>
  import AppButton from "@/components/AppButton.vue"
  import AppInput from "@/components/AppInput.vue"
  import { useRoomsStore } from "@/store/StoreRooms"
  import { MailIcon } from "@heroicons/vue/outline"
  import { ref } from "vue"

  const rooms = useRoomsStore()
  const newMessage = ref("")

  function sendMessage() {
    if (!newMessage.value) {
      return
    }

    rooms.messagesAdd(newMessage.value)

    newMessage.value = ""
  }
</script>
