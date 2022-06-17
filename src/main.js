import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/sass/main.scss'

import apiPlugin from '@/plugins/api.plugin.js'

const app = createApp(App)

app.use(router)
app.use(apiPlugin)
app.mount('#app')
