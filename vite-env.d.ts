// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_URL: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_MODE: string
  readonly VITE_APP_PROXY_URL: string
  readonly VITE_APP_API_URL: string
  readonly VITE_APP_ROUTER_HISTORY_MODE: string
  readonly VITE_APP_STORAGE_KEY: string
  readonly VITE_APP_STORAGE: string
  readonly VITE_APP_REFRESH_TOKENS_MINS: number
  readonly VITE_APP_PUSHER_APP_KEY: string
  readonly VITE_APP_MANTAINANCE_MODE: string
  
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}