import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import CartList from '../views/CartList.vue'
import _404 from '../views/_404Page.vue'

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
    path: '/mycart',
    name: 'CartList',
    component: CartList
  },
  {
    path: '*',
    name: 'error404',
    component: _404
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token')
  if (isAuthenticated) {
    if (to.name === 'Register' || to.name === 'Login') next({ name: 'Home' })
    else next()
  } else {
    if (to.name === 'Home' || to.name === 'CartList') next({ name: 'Login' })
    else next()
  }
})
export default router
