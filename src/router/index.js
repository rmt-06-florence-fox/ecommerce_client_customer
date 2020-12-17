import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register'
import NotFound from '../views/NotFound.vue'
import Cart from '../views/Cart.vue'
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
    path: '*',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token')
  console.log(isAuthenticated, '<<<<<<<<<< isAuthenticated')
  if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) next({ name: 'Home' })
  else if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) next({ name: 'Login' })
  else next()
})
export default router
