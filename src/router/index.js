import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product'
import Login from '../views/Login'
import Register from '../views/Register'
import Dashboard from '../views/Dashboard'
import Cart from '../views/Cart'
import Wishlist from '../views/Wishlist'
import Transactions from '../views/Transactions'
import NotFound from '../views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/customer',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: '',
        name: 'ProductList',
        component: Product
      },
      {
        path: 'cart',
        name: 'ShoppingCart',
        component: Cart
      },
      {
        path: 'wishlist',
        name: 'Wishlist',
        component: Wishlist
      },
      {
        path: 'transactions',
        name: 'Transactions',
        component: Transactions
      }
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        name: 'Product',
        component: Product
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
      }
    ]
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token')
  if (to.name !== 'Login' && to.name !== 'Product' && to.name !== 'Register') {
    if (!isAuthenticated) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else next()
})

export default router
