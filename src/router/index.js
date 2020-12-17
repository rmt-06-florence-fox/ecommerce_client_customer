import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import Cart from '../views/cart.vue'
import Wishlist from '../views/wishlist.vue'
import Checkout from '../views/checkout.vue'
import History from '../views/history.vue'

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
    path: '/wish',
    name: 'Wish',
    component: Wishlist
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/carts',
    name: 'Carts',
    component: Cart
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.accesstoken
  if (!isAuthenticated) next()
  else {
    next()
  }
})

export default router
