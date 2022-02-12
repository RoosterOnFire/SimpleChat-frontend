<template>
  <form class="flex flex-col gap-3 md:flex-1" @submit.prevent>
    <AppInput v-model="value" placeholder="Room" />
    <AppButton :title="title" @click="onClick(value)" />
  </form>
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import AppButton from "@/components/AppButton.vue"
  import AppInput from "@/components/AppInput.vue"

  export default defineComponent({
    components: {
      AppButton,
      AppInput,
    },
    props: {
      onClick: {
        type: Function,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
    setup() {
      return {
        value: "",
      }
    },
  })
</script>
