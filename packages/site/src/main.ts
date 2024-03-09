import { createApp } from 'vue'
import './style.css'
import './styles/index.less'
import 'a-draggable-component/dist/style.css'
import router from './router'
import App from './App.vue'
// import draggableComponents from 'draggable-components'

const app = createApp(App)
app.use(router)
// app.use(draggableComponents)
app.mount('#app')
