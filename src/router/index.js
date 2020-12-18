import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/LoginPage'
import Register from '../views/RegisterPage'
import Cart from '../components/CartsTabel'
import History from '../views/History'
import Wishlist from '../views/Wishlists'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.access_token
  if ((to.name === 'Cart' || to.name === 'Wishlist' || to.name === 'History') && !isAuthenticated) next({ name: 'Login' })
  else next()
})

export default router
