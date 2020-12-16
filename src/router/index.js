import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Carts from '../views/Carts.vue'
import Histories from '../views/Histories.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/carts',
    name: 'Carts',
    component: Carts
  },
  {
    path: '/histories',
    name: 'Histories',
    component: Histories
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token')
  if ((to.path === '/login' || to.path === '/register') && isAuthenticated) next({ path: '/' })
  else if ((to.path !== '/login' && to.path !== '/register' && to.path !== '/') && !isAuthenticated) next({ path: '/' })
  else next()
})

export default router
