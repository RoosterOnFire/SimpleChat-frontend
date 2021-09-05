<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store/Store";
import AppButton from "./AppButton.vue";

export default defineComponent({
  components: {
    AppButton,
  },
  setup() {
    const store = useStore();

    return {
      isNicknameInUse: computed(() => store.state.errors.nicknameInUse),
      nickname: computed({
        get: () => store.state.user.nickname,
        set: (nickname) => store.commit("updateNickname", nickname),
      }),
      async joinChat() {
        store.dispatch("connect");
      },
    };
  },
});
</script>

<template>
  <form class="login">
    <input
      type="text"
      class="input"
      :class="{ 'border-red-600': isNicknameInUse }"
      placeholder="Nickname"
      required
      v-model="nickname"
    />
    <AppButton title="Join" @click="joinChat" />
  </form>
</template>

<style lang="postcss">
.login {
  @apply space-y-4 w-2/3 lg:w-1/2;
}
</style>
