<template>
  <span class="text-error">
    <slot />
  </span>
</template>

<script lang="ts">
  import { defineComponent } from "vue"

  export default defineComponent({
    setup() {
      return {}
    },
  })
</script>
