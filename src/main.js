import './assets/main.css'
import {createPinia} from 'pinia'
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
// 全量引入 bkui-vue
import bkui from 'bkui-vue'
// 全量引入 bkui-vue 样式
import 'bkui-vue/dist/style.css'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.use(bkui)
app.mount('#app')
