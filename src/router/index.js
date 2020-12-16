import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/MainPage.vue'
import LoginPage from '../views/LoginPage.vue'
import ListCarts from '../views/ListCarts.vue'
import Register from '../views/Register.vue'
import listTransactions from '../views/ListTransactions.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/carts',
    name: 'ListCarts',
    component: ListCarts
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/histories',
    name: 'ListTransactions',
    component: listTransactions
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
