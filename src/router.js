import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'

const routes = [
  {
    path: '/',
    //name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/dashboard",
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('./views/Users.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/users/:id',
    name: 'UsersDetail',
    component: () => import('./views/UsersDetail.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/plans',
    name: 'Plans',
    component: () => import('./views/Plans.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/metrics',
    name: 'Metrics',
    component: () => import('./views/Metrics.vue'),
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router