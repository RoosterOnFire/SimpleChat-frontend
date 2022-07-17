<template>
  <button
    v-if="type === 'button'"
    type="button"
    class="inline-flex justify-center gap-2 rounded-md px-4 py-2 text-center align-baseline font-medium text-white hover:bg-primary-dark focus:outline-none"
  >
    <slot />
  </button>
  <router-link
    v-else
    class="inline-flex justify-center gap-2 rounded-md px-4 py-2 text-center align-baseline font-medium text-white hover:bg-primary-dark focus:outline-none"
  >
    <slot />
  </router-link>
</template>

<script lang="ts" setup>
  const props = defineProps({
    type: {
      type: String,
      default: "link",
    },
  })
</script>
