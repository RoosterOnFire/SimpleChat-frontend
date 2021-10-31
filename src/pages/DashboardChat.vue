<script lang="ts">
import { defineComponent } from "vue";
import ChatMessages from "@/components/ChatMessages.vue";
import ChatForm from "@/components/ChatForm.vue";

export default defineComponent({
  components: {
    ChatMessages,
    ChatForm,
  },
  setup() {},
});
</script>

<template>
  <div class="main page-chat">
    <ChatMessages />
    <ChatForm />
  </div>
</template>

<style lang="postcss">
.page-chat {
  @apply flex-col;
}
</style>