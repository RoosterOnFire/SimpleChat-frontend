<template>
  <form class="flex flex-col justify-center gap-3 md:flex-1" @submit.prevent>
    <AppInput v-model="value" placeholder="Room" />
    <AppButton :title="title" @click="onClick(value)" />
  </form>
</template>

<script lang="ts" setup>
  import { ref } from "vue"
  import AppButton from "@/components/AppButton.vue"
  import AppInput from "@/components/AppInput.vue"

  const value = ref("value")

  const props = defineProps({
    onClick: {
      type: Function,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  })
</script>
