import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Product from '../views/Product.vue'
import NotFound from '../views/404.vue'
import Dashboard from '../views/Dashboard.vue'
import Cart from '../views/Cart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'Product',
        component: Product
      },
      {
        path: '/register',
        name: 'Register',
        component: Register
      },
      {
        path: '/login',
        name: 'Login',
        component: Login
      }
    ]
  },
  {
    path: '/customer',
    component: Dashboard,
    children: [
      {
        path: '',
        name: 'ListProduct',
        component: Product
      },
      {
        path: '/customer/carts',
        name: 'Cart',
        component: Cart
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.access_token
  // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  if (to.name === 'Login' && isAuthenticated) next({ name: 'Product' })
  else if (to.name === 'Cart' && !isAuthenticated) next({ name: 'Login' })
  else next()
})

export default router
