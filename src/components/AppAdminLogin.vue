<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/store/Store";
import AppButton from "@/components/AppButton.vue";
import { StoreAction } from "@/type/enums";

export default defineComponent({
  components: {
    AppButton,
  },
  setup() {
    const store = useStore();
    const adminAccessKey = ref("");

    return {
      adminAccessKey,
      async connect() {
        store.dispatch(StoreAction.connectAdmin, adminAccessKey.value);
      },
    };
  },
});
</script>

<template>
  <form class="form-login">
    <input
      type="text"
      class="input"
      placeholder="Admin access key"
      required
      v-model="adminAccessKey"
    />
    <AppButton title="Connect" @click="connect" />
  </form>
</template>

<style lang="postcss">
.form-login {
  @apply w-2/3 lg:w-1/2 space-y-4 flex flex-col;
}
</style>
