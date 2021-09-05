<script lang="ts">
import { defineComponent, ref, onUpdated, computed } from "vue";
import { useStore } from "@/store/Store";

export default defineComponent({
  setup() {
    const store = useStore();
    const messages = computed(() => store.state.messages);
    const container = ref<HTMLElement | null>(null);

    onUpdated(() => {
      container.value?.lastElementChild?.scrollIntoView();
    });

    return {
      messages,
      container,
    };
  },
});
</script>

<template>
  <div class="messages" ref="container">
    <p
      v-for="(message, index) of messages"
      :key="index"
      class="message-row"
      :class="{ 'message-row--notify': message.user === 'App' }"
    >
      {{ message.user }}: {{ message.value }}
    </p>
  </div>
</template>

<style lang="postcss" >
.messages {
  @apply p-4 space-y-4 flex-1;
  @apply overflow-y-auto;
}

.message-row {
  @apply px-4 py-2 w-max;
  @apply text-black;
  @apply bg-white;
  @apply rounded-full border-2;
  @apply select-all;
}

.message-row--notify {
  @apply text-indigo-600;
}
</style>