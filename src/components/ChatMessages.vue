<script lang="ts">
import { useAppStore } from "@/store/Store";
import { StoreGetters } from "@/type/TypeEnums";
import { Message } from "@/type/TypeState";
import { defineComponent, ref, onUpdated, computed } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  setup() {
    const container = ref<HTMLElement | null>(null);
    const store = useAppStore();

    onUpdated(() => {
      container.value?.lastElementChild?.scrollIntoView();
    });

    return {
      container,
      messages: computed<Message[]>(
        () => store.getters[StoreGetters.roomsMessages]
      ),
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
      :class="{ 'text-blue-600': message.user === 'App' }"
    >
      {{ message.user }}: {{ message.value }}
    </p>
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