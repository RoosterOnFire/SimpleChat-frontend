<template>
  <form class="flex w-2/3 flex-col gap-4 md:w-1/3">
    <slot />
  </form>
</template>

<script lang="ts">
  import { defineComponent } from "vue"

  export default defineComponent({
    setup() {},
  })
</script>
