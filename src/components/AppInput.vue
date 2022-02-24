<template>
  <input
    :value="modelValue"
    class="mx-auto block w-full appearance-none rounded-md border-2 px-3 py-2 focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-light sm:text-sm"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
  import { defineComponent } from "vue"

  export default defineComponent({
    props: {
      modelValue: {
        type: String,
        default: "",
      },
    },
    emits: ["update:modelValue"],
    setup() {
      return {}
    },
  })
</script>
