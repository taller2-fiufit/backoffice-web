import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from './views/Dashboard.vue'
import RegisterView from './views/Register.vue'
import LoginView from './views/Login.vue'

const routes = [
  {
    path: '/',
    component: LoginView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/dashboard',
    name: 'DashboardView',
    component: DashboardView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: RegisterView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/users',
    name: 'UsersView',
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
    name: 'PlansView',
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
    name: 'ServicesView',
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
    name: 'MetricsView',
    component: () => import('./views/Metrics.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('user') === null) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
