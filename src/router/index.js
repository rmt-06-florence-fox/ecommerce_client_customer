import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/register.vue'
import Cart from '../views/cart.vue'
import TransactionHistory from '../views/TransactionHistory'
import Wishlist from '../views/Wishlist'
import notFoundPage from '../views/404.vue'

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
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/transactionHistory',
    name: 'TransactionHistory',
    component: TransactionHistory
  },
  {
    path: '/Wishlist',
    name: 'Wishlist',
    component: Wishlist
  },
  {
    path: '*',
    component: notFoundPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && to.name !== 'Register' && to.name !== 'Home' && !localStorage.access_token) next({ name: 'Home' })
  else if (to.name === 'Login' && localStorage.access_token) next({ name: 'Home' })
  else next()
})

export default router
