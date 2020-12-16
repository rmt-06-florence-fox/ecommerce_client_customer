import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signin',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/signup',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      }
    ]
  },
  {
    path: '/carts',
    name: 'Cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue'),
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.access_token
      if (!isAuthenticated) next('/signin')
      else next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
