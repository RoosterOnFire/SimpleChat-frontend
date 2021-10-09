<script lang="ts">
import { defineComponent, ref, onUpdated } from "vue";

export default defineComponent({
  setup() {
    const container = ref<HTMLElement | null>(null);

    onUpdated(() => {
      container.value?.lastElementChild?.scrollIntoView();
    });

    return {
      messages: [],
      container,
    };
  },
});
</script>

<template>
  <div class="messages" ref="container">
    <!-- <p
      v-for="(message, index) of messages"
      :key="index"
      class="message-row"
      :class="{ 'text-blue-600': message.user === 'App' }"
    >
      {{ message.user }}: {{ message.value }}
    </p> -->
  </div>
</template>

<style lang="postcss">
.messages {
  @apply p-4 space-y-4 flex-1 overflow-y-auto;
}

.message-row {
  @apply w-max px-4 py-2 bg-white rounded-full border-2;
  @apply text-black select-all;
}
</style>