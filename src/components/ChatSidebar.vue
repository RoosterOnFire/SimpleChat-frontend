<template>
  <div class="sidebar">
    <transition-group name="chat-list">
      <!-- <p v-for="(user, index) in users" :key="index" class="chat-sidebar-row">
        {{ user.username }}
      </p> -->
    </transition-group>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue"

  export default defineComponent({
    setup() {
      return {
        users: [],
      }
    },
  })
</script>

<style lang="postcss">
  .chat-sidebar-row {
    @apply bg-primary border border-transparent rounded-md;
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
