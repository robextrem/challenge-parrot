/* Listado de componentes */
import { createRouter, createWebHistory } from 'vue-router'

import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import Menu from '../pages/Menu.vue'
import PageNotFound from '../pages/PageNotFound.vue'
/* Rutas de componentes*/
const routes = [
  { 
    path: '/', 
    redirect: () => {
      return { path: '/login' }
    },
  },
  { 
    path: '/login', 
    name: 'login', 
    component: Login 
  },
  { 
    path: '/home', 
    name: 'home', 
    component: Home,
    meta:{
      requiresAuth: true
    } 
  },
  { 
    path: '/menu', 
    name: 'menu', 
    component: Menu,
    meta:{
      requiresAuth: true
    } 
  },
  { path: '/:pathMatch(.*)*', component: PageNotFound },
]

const history = createWebHistory()

const router = createRouter({
  history,
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && from) {
    const ukey = JSON.parse(sessionStorage.getItem(import.meta.env.VITE_APP_STORAGE_KEY) || '{}')
    if (ukey?.user) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
