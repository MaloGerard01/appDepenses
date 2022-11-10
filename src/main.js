import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import { useCookies } from "vue3-cookies";

createApp(App).use(router).use(useCookies).mount('#app')
