<script lang="ts">
import { useStore } from "@/store/Store";
import { User } from "@/type/Data";
import { defineComponent, PropType } from "vue";
import AppButton from "@/components/AppButton.vue";

export default defineComponent({
  components: { AppButton },
  name: "AdminKickUser",
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  setup() {
    const store = useStore();

    return {
      kickUser(userId: string) {
        store.dispatch("kickUser", userId);
      },
    };
  },
});
</script>

<template>
  <div class="user-cell">
    <p>Username: {{ user.username }}</p>
    <AppButton title="Kick" @click="kickUser(user.userId)" />
  </div>
</template>

<style lang="postcss" scoped>
.user-cell {
  @apply flex justify-center items-center gap-x-8;
}
</style>