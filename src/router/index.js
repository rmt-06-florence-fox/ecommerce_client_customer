import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product'
import Login from '../views/Login'
import Register from '../views/Register'
import Dashboard from '../views/Dashboard'
import Cart from '../views/Cart'
import Wishlist from '../views/Wishlist'

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
        path: '/customer/cart',
        name: 'ShoppingCart',
        component: Cart
      },
      {
        path: '/customer/wishlist',
        name: 'Wishlist',
        component: Wishlist
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
