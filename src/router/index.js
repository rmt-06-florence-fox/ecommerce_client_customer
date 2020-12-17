import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Cart from '../views/Cart.vue'
import MainPage from '../views/MainPage.vue'
import HistoryTransaction from '../views/History.vue'

Vue.use(VueRouter)

const routes = [
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
        component: Cart
      },
      {
        path: 'history',
        name: 'HistoryTransaction',
        component: HistoryTransaction
      },
      {
        path: 'about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
  const authenticated = localStorage.getItem('access_token')
  if ((to.name === 'Login' || to.name === 'Register') && authenticated) {
    next({ name: 'Home' })
  } else if (!authenticated && (to.name === 'MainPage' || to.name === 'Cart')) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
