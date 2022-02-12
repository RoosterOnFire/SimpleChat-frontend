<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="mx-auto block w-full appearance-none rounded-md border-2 px-3 py-2 focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-light sm:text-sm"
  />
</template>

<script lang="ts">
  import { defineComponent } from "vue"

  export default defineComponent({
    props: ["modelValue"],
    emits: ["update:modelValue"],
    setup() {},
  })
</script>
