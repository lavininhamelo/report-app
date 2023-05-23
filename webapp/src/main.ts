import { createApp } from 'vue'
import Toast from "vue-toastification";
import App from './App.vue';

import "vue-toastification/dist/index.css";

import './style.css'

const app = createApp(App)

app.use(Toast)
app.mount('#app')
