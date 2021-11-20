<script lang="ts">
import { defineComponent } from "vue";
import ChatMessages from "@/components/ChatMessages.vue";
import ChatForm from "@/components/ChatForm.vue";
import { useAppStore } from "@/store/Store";

export default defineComponent({
  components: {
    ChatMessages,
    ChatForm,
  },
  setup() {
    const store = useAppStore();

    return {
      isChatSelected: store.state.rooms?.meta.selected,
    };
  },
});
</script>

<template>
  <div v-if="isChatSelected" class="main page-chat">
    <ChatMessages />
    <ChatForm />
  </div>
  <div v-else class="h-full flex justify-center">
    <h1 class="my-auto text-primary text-lg bg-gray-50 bg-opacity-30">
      You have not joined any rooms
    </h1>
  </div>
</template>

<style lang="postcss">
.page-chat {
  @apply flex-col;
}
</style>