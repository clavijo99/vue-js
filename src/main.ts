import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import App from './App.vue'
import './styles/tailwind.css'

import {
  i18n,
} from './modules/index'
import isAuthGuard from './guard/authGuard'

const app = createApp(App)

const routes = setupLayouts(generatedRoutes)

routes.forEach((route) => {
  if (route.path.includes('/dashboard'))
    route.beforeEnter = [isAuthGuard]
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(router)
app.use(i18n)
app.mount('#app')
