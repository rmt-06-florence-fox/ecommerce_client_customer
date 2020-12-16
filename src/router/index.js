import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Not404 from '../views/Not404.vue'
// import Alert from '../views/Alert'
import Cart from '../views/Cart'
import History from '../views/History'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
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
    path: '*',
    component: Not404
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token')
  if ((to.path === '/cart' || to.path === '/history') && !isAuthenticated) next({ name: 'Login' })
  else if (to.path === '/login' && isAuthenticated) next({ name: 'Home' })
  else next()
})

export default router
