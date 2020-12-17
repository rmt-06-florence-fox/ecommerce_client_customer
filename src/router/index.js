import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Register from '../views/Register'
import MainPage from '../views/MainPage'
import Home from '../views/Home'
import Cart from '../views/Cart'
import History from '../views/History'
// import Banners from '../views/Banners'
import NotFoundPage from '../views/NotFoundPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          title: 'ShopPal - Home'
        }
      },
      {
        path: '/cart',
        name: 'Cart',
        component: Cart,
        meta: {
          title: 'ShopPal - Cart'
        }
      },
      {
        path: '/history',
        name: 'History',
        component: History,
        meta: {
          title: 'ShopPal - Transaction History'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'ShopPal - Login'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'ShopPal - Register'
    }
  },
  {
    path: '*',
    component: NotFoundPage,
    meta: {
      title: '404 - Not Found Page'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'ShopPal'
  const isAuthenticated = localStorage.access_token
  if (to.name === 'Login' && isAuthenticated) next({ name: 'Home' })
  else if (to.name === 'Register' && isAuthenticated) next({ name: 'Home' })
  else next()
})

export default router
