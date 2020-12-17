import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import CartPage from '../views/CartPage.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

function guardMyroute (to, from, next) {
  if (!localStorage.getItem('access_token') && to.path !== '/login') next({ path: '/login' })
  else next()
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/cart',
    name: 'cart',
    beforeEnter: guardMyroute,
    component: CartPage
  },
  {
    path: '*',
    name: '404NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
