import { createUserMessage } from '@/helpers/createMessages';
import { StoreMutations, StoreActions, StoreGetters } from '@/type/TypeEnums';
import { Message, StoreModuleRooms } from '@/type/TypeState';

const ModuleRooms: StoreModuleRooms = {
  state: () => ({
    meta: {
      selected: '',
    },
    rooms: [],
  }),
  mutations: {
    [StoreMutations.roomsCreate](state, payload: { name: string }) {
      state.meta.selected = payload.name;

      const room = state.rooms.find((room) => room.name === payload.name);
      if (!room) {
        state.rooms.push({ name: payload.name, users: [], messages: [] });
      }
    },
    [StoreMutations.roomsJoin](state, payload: { name: string }) {
      state.meta.selected = payload.name;

      const room = state.rooms.find((room) => room.name === payload.name);
      if (!room) {
        state.rooms.push({ name: payload.name, users: [], messages: [] });
      }
    },
    [StoreMutations.messageCreate](
      state,
      payload: { room: string; message: Message }
    ) {
      state.rooms
        .find((room) => room.name === state.meta.selected)
        ?.messages.push(payload.message);
    },
    [StoreMutations.messagesUpdate](
      state,
      payload: { room: string; message: Message }
    ) {
      state.rooms
        .find((room) => room.name === payload.room)
        ?.messages.push(payload.message);
    },
    [StoreMutations.messageChatJoin](state, payload) {
      // state.messages.push(
      //   createAppNotification(`"${payload.username}" joined`)
      // );
    },
    [StoreMutations.messageChatLeave](state, payload) {
      // state.messages.push(createAppNotification(`"${payload.username}" left`));
    },
  },
  actions: {
    [StoreActions.roomsCreate]() {
      // used by plugin chat socket
    },
    [StoreActions.roomsJoin]() {
      // used by plugin chat socket
    },
    [StoreActions.roomsLeave]() {
      // used by plugin chat socket
    },
    [StoreActions.messagesAdd](
      { state, commit, rootState },
      payload: { message: string }
    ) {
      if (!rootState.user) {
        return;
      }

      commit(StoreMutations.messageCreate, {
        room: state.meta.selected,
        message: createUserMessage(rootState.user, payload.message),
      });
    },
  },
  getters: {
    [StoreGetters.roomsMessages](state) {
      return (
        state.rooms.find((room) => room.name === state.meta.selected)
          ?.messages || []
      );
    },
  },
};

export default ModuleRooms;
