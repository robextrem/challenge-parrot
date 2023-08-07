import { createApp } from 'vue'
import './assets/sass/app.scss'
import App from './App.vue'
import SimpleVueValidator from 'simple-vue3-validator'
import Maintenance from "./pages/Maintenance.vue"
import router from './router'
import store from './store'

const maintenance = import.meta.env.VITE_APP_MANTAINANCE_MODE === "on"

const app = createApp(maintenance?Maintenance:App)
app.use(router)
app.use(store)
app.use(SimpleVueValidator)
app.config.warnHandler = () => null
app.mount('#app')