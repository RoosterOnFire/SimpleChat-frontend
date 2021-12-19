import { defineConfig } from "vite"
import { resolve } from "path"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  resolve: {
    alias: [{ find: "@", replacement: resolve("src") }],
  },
  plugins: [vue()],
  server: {
    fs: {
      allow: [".."],
    },
  },
})
