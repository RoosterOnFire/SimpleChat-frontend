<template>
  <button
    class="flex justify-center gap-2 rounded-md border border-transparent bg-primary-light py-2 px-4 align-middle font-medium text-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2"
    :type="type"
  >
    {{ title }}<slot />
  </button>
</template>

<script lang="ts">
  import { defineComponent } from "vue"

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
  })
</script>
