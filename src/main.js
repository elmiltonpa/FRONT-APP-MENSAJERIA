import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import vuetify from './plugins/vuetify.js'

const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(router)
app.mount('#app')
