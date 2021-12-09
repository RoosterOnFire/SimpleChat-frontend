<template>
  <form class="form md:flex-1" @submit.prevent>
    <input type="text" class="input" placeholder="Room" v-model="value" />
    <AppButton :title="title" @click="onClick(value)" />
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppButton from "@/components/AppButton.vue";

export default defineComponent({
  components: {
    AppButton,
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
    };
  },
});
</script>
