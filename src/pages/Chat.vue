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
  <ChatSidebar />
  <div class="main">
    <ChatMessages />
    <ChatForm />
  </div>
</template>
