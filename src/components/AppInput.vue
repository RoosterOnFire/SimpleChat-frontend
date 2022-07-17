<template>
  <input
    :value="modelValue"
    class="mx-auto block w-full appearance-none rounded-md border-2 px-3 py-2 focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-light sm:text-sm"
    @input="emits('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts" setup>
  const props = defineProps({
    modelValue: {
      type: String,
      default: "",
    },
  })

  const emits = defineEmits(["update:modelValue"])
</script>
