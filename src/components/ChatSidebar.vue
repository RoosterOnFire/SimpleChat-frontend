<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { StoreGetter } from "@/type/enums";

export default defineComponent({
  setup() {
    return {
      ...mapGetters([StoreGetter.users]),
    };
  },
});
</script>

<template>
  <div class="sidebar">
    <transition-group name="chat-list">
      <p v-for="(user, index) in users()" :key="index" class="chat-sidebar-row">
        {{ user.username }}
      </p>
    </transition-group>
  </div>
</template>

<style lang="postcss">
.chat-sidebar-row {
  @apply bg-primary-800 border border-transparent rounded-md;
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
