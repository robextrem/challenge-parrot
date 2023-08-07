import { fileURLToPath } from "url"
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import stylelint from 'vite-plugin-stylelint'

console.log('\x1b[33m%s\x1b[0m', 'Welcome to Parrot Connect! 🦜')
export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}
  console.log(`You are running a ${process.env.VITE_APP_MODE} instance`)
  return defineConfig({
    plugins: [vue(), eslintPlugin(), stylelint({ build: true })],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: 8080,
      watch: {
        usePolling: true,
      },
      proxy: {
        '^/bridge/.*': {
          target: process.env.VITE_APP_PROXY_URL,
          rewrite: (path) => path.replace(/^\/bridge/, ''),
          changeOrigin: true,
        },
      }
    }
  })
}
