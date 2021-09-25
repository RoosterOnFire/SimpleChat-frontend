<script lang="ts">
import { computed, defineComponent } from "vue";
import { User } from "@/type/data";
import { useStore } from "@/store/Store";

export default defineComponent({
  setup() {
    const store = useStore();
    const users = computed<User[]>(() => store.state.users);

    return {
      users,
    };
  },
});
</script>

<template>
  <div class="sidebar">
    <transition-group name="chat-list">
      <p v-for="(user, index) in users" :key="index" class="chat-sidebar-row">
        {{ user.username }}
      </p>
    </transition-group>
  </div>
</template>

<style lang="postcss">
.chat-sidebar-row {
  @apply bg-indigo-800 border border-transparent rounded-md;
  @apply text-white text-center;
}

.chat-list-enter-active,
.chat-list-leave-active {
  @apply transition duration-300;
}
.chat-list-enter-from,
.chat-list-leave-to {
  @apply -translate-x-8 opacity-0;
}
</style>
