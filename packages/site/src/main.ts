import { createApp } from 'vue'
import './style.css'
import './styles/index.less'
import 'a-draggleble-component/dist/style.css'
import router from './router'
import App from './App.vue'
// import dragglebleComponents from 'draggleble-components'

const app = createApp(App)
app.use(router)
// app.use(dragglebleComponents)
app.mount('#app')
