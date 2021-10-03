<script lang="ts">
import { useAppStore } from "@/store/Store";
import { defineComponent, ref } from "vue";
import AppButton from "@/components/AppButton.vue";
import { StoreMutations } from "@/type/enums";
import { MailIcon } from "@heroicons/vue/outline";

export default defineComponent({
  components: {
    AppButton,
    MailIcon,
  },
  setup() {
    const store = useAppStore();
    const newMessage = ref("");

    return {
      newMessage,
      sendMessage() {
        if (newMessage.value === "") {
          return;
        }

        store.commit(StoreMutations.createMessage, newMessage.value);

        newMessage.value = "";
      },
    };
  },
});
</script>

<template>
  <form
    class="chat-form"
    @submit.prevent="sendMessage"
    @keypress.enter.prevent="sendMessage"
  >
    <input type="text" class="input" v-model="newMessage" />
    <AppButton title="Send" type="submit">
      <MailIcon class="w-6 h-6" />
    </AppButton>
  </form>
</template>

<style lang="postcss">
.chat-form {
  @apply p-4 flex justify-around gap-4 bg-primary;
}
</style>