import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue')
  },
  {
    path: '/plans',
    name: 'Plans',
    component: () => import('../views/Plans.vue')
  },
  {
    path: '/metrics',
    name: 'Metrics',
    component: () => import('../views/Metrics.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
