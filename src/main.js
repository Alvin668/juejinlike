//main.js
import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import Vant from 'vant' //本次新增
import 'vant/lib/index.css' //本次新增

const app = createApp(App);
app.use(router)
    .use(store)
    .use(Vant) //本次新增
    .mount('#app')