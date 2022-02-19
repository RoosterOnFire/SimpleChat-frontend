import "./styles.css"
import { createApp, markRaw } from "vue"
import App from "./App.vue"
import Router from "@/router/Router"
import { createPinia } from "pinia"
import { createPluginChatSocket } from "./store/StorePluginChatSocket"

const pinia = createPinia()
pinia.use(createPluginChatSocket)

pinia.use(({ store }) => {
  store.router = markRaw(Router)
})

createApp(App).use(pinia).use(Router).mount("#app")
