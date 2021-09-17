<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <button type="button" class="button">
    {{ title }}
  </button>
</template>

<style lang="postcss" scoped>
.button {
  @apply py-2 px-4;
  @apply font-medium text-white;
  @apply bg-indigo-600 hover:bg-indigo-700;
  @apply border border-transparent rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
  @apply focus:outline-none;
}
</style>