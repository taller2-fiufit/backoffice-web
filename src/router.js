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
      requiresAuth: true
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
    path: '/plans/:id',
    name: 'PlansDetail',
    component: () => import('./views/PlansDetail.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('./views/Services.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/services/:id',
    name: 'ServicesDetail',
    component: () => import('./views/ServicesDetail.vue'),
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

router.beforeEach((to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("user") === null) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router