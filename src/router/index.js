import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import LoginForm from '../components/LoginForm.vue'
import RegisterForm from '../components/RegisterForm.vue'
import ProductList from '../components/ProductList.vue'
import Checkout from '../views/Checkout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        name: 'ProductList',
        component: ProductList
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: Checkout
      }
    ]
  },
  {
    path: '/users',
    name: 'Login',
    component: Login,
    children: [
      {
        path: 'login',
        name: 'LoginForm',
        component: LoginForm
      },
      {
        path: 'register',
        name: 'RegisterForm',
        component: RegisterForm
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token')
  if (to.name === 'Checkout' && !isAuthenticated) next({ name: 'LoginForm' })
  else next()
})

export default router
