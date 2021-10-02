<script lang="ts">
import { useAppStore } from "@/store/Store";
import { defineComponent, ref } from "vue";
import AppButton from "@/components/AppButton.vue";
import { StoreActions, StoreMutations } from "@/type/enums";

export default defineComponent({
  components: {
    AppButton,
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
  <form class="chat-form" @keypress.enter="sendMessage">
    <input type="text" class="input" v-model="newMessage" />
    <AppButton title="Send" @click="sendMessage" />
  </form>
</template>

<style lang="postcss">
.chat-form {
  @apply p-4 flex justify-around gap-4 border-t-2 border-primary;
}
</style>