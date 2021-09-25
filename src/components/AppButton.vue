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
