import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MainPage from '../views/MainPage'
import Error404 from '../views/Error404'
import Login from '../views/Login.vue'
import CartPage from '../views/CartPage.vue'
import Register from '../views/RegisterPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'cart',
        name: 'Cart',
        component: CartPage
      }
    ]
  },
  {
    path: '*',
    name: 'Error404',
    component: Error404
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token')
  // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  if (to.name === 'Login' && isAuthenticated) next({ name: 'Home' })
  else next()
})
export default router
