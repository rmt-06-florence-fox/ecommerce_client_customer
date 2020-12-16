import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Cart from '../views/Cart.vue'
import History from '../views/History.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/history',
    name: 'History',
    component: History
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token')
  if (to.name === 'Register' && isAuthenticated) {
    next({ name: 'Home' })
  } else if (to.name === 'Register' && !isAuthenticated) {
    next()
  } else if (to.name !== 'Home' && !isAuthenticated) {
    next({ name: 'Home' })
  } else next()
})

export default router
