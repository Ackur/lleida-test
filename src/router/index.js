import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '../views/UsersView.vue'
import SmsView from '../views/SmsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Users',
      component: UsersView
    },
    {
      path: '/sms',
      name: 'Sms',
      component: SmsView
    }
  ]
})

export default router
