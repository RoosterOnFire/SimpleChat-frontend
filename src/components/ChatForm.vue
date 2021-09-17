<script lang="ts">
import { useStore } from "@/store/Store";
import { defineComponent, ref } from "vue";
import AppButton from "@/components/AppButton.vue";

export default defineComponent({
  components: {
    AppButton,
  },
  setup() {
    const store = useStore();
    const newMessage = ref("");

    return {
      newMessage,
      sendMessage() {
        if (newMessage.value === "") {
          return;
        }

        store.dispatch("addMessage", newMessage.value);

        newMessage.value = "";
      },
    };
  },
});
</script>

<template>
  <form class="form" @keypress.enter="sendMessage">
    <input type="text" class="input" v-model="newMessage" />
    <AppButton title="Send" @click="sendMessage" />
  </form>
</template>

<style lang="postcss" scoped>
.form {
  @apply p-4 flex justify-around gap-4;
  @apply border-t-2 border-indigo-600;
}
</style>