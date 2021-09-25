<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store/Store";
import AppButton from "@/components/AppButton.vue";
import { StoreAction, StoreCommit } from "@/type/enums";

export default defineComponent({
  components: {
    AppButton,
  },
  setup() {
    const store = useStore();

    return {
      isUsernameFree: computed(() => store.state.errors.nicknameInUse),
      username: computed({
        get: () => store.state.user.username,
        set: (username) => store.commit(StoreCommit.updateNickname, username),
      }),
      async joinChat() {
        store.dispatch(StoreAction.connect);
      },
    };
  },
});
</script>

<template>
  <form class="login-form">
    <input
      type="text"
      class="input"
      :class="{ 'border-red-600': isUsernameFree }"
      placeholder="Username"
      required
      v-model="username"
    />
    <AppButton title="Join" @click="joinChat" />
  </form>
</template>

<style lang="postcss">
.login-form {
  @apply w-2/3 lg:w-1/2 space-y-4 flex flex-col;
}
</style>
