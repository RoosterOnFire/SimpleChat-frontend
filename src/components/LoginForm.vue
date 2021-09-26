<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store/Store";
import AppButton from "@/components/AppButton.vue";
import { StoreAction, StoreCommit, StoreGetter } from "@/type/enums";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  components: {
    AppButton,
  },
  setup() {
    const store = useStore();

    return {
      username: computed({
        get: () => store.state.user.username,
        set: (username) => store.commit(StoreCommit.updateNickname, username),
      }),
      ...mapGetters([StoreGetter.isUsernameAvailable]),
      ...mapActions([StoreAction.connect]),
    };
  },
});
</script>

<template>
  <form class="login-form" @submit.prevent>
    <input
      type="text"
      class="input"
      :class="{ 'border-red-600': isUsernameAvailable() }"
      placeholder="Username"
      required
      v-model="username"
    />
    <AppButton title="Join" @click="connect()" />
  </form>
</template>

<style lang="postcss">
.login-form {
  @apply w-2/3 lg:w-1/2 space-y-4 flex flex-col;
}
</style>
