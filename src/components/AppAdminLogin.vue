<script lang="ts">
import { defineComponent, ref } from "vue";
import AppButton from "@/components/AppButton.vue";
import { StoreAction } from "@/type/enums";
import { mapActions } from "vuex";

export default defineComponent({
  components: {
    AppButton,
  },
  setup() {
    const adminAccessKey = ref("");

    return {
      adminAccessKey,
      ...mapActions([StoreAction.connectAdmin]),
    };
  },
});
</script>

<template>
  <form class="form-login" @submit.prevent>
    <input
      type="text"
      class="input"
      placeholder="Admin access key"
      required
      v-model="adminAccessKey"
    />
    <AppButton title="Connect" @click="connectAdmin(adminAccessKey)" />
  </form>
</template>

<style lang="postcss">
.form-login {
  @apply w-2/3 lg:w-1/2 space-y-4 flex flex-col;
}
</style>
