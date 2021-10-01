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

<style lang="postcss">
.button {
  @apply py-2 px-4;
  @apply font-medium text-white;
  @apply bg-primary-800 hover:bg-primary-700;
  @apply border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-800;
}
</style>
