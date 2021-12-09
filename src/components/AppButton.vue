<template>
  <button class="button" :type="type">{{ title }}<slot /></button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "button",
    },
  },
});
</script>

<style lang="postcss">
.button {
  @apply flex justify-center gap-2 align-middle py-2 px-4;
  @apply font-medium text-white;
  @apply bg-primary hover:bg-primary-light;
  @apply border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light;
}
</style>
