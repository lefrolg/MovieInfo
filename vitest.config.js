import {fileURLToPath} from 'node:url'
import {mergeConfig, defineConfig, configDefaults} from 'vitest/config'
import viteConfig from './vite.config'
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/**'],
    root: fileURLToPath(new URL('./', import.meta.url)),
    server: {
      deps: {
        inline: ['vuetify'],
      },
    },
  },
})

