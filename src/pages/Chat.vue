<script lang="ts">
import { defineComponent } from "vue";
import ChatMessages from "@/components/ChatMessages.vue";
import ChatSidebar from "@/components/ChatSidebar.vue";
import ChatForm from "@/components/ChatForm.vue";

export default defineComponent({
  components: {
    ChatMessages,
    ChatSidebar,
    ChatForm,
  },
  setup() {},
});
</script>

<template>
  <div class="chat">
    <ChatSidebar />
    <div class="main">
      <ChatMessages />
      <ChatForm />
    </div>
  </div>
</template>

<style lang="postcss">
.chat {
  @apply flex h-full;
}

.main {
  @apply flex flex-col;
  @apply w-full md:w-4/5;
}
</style>
