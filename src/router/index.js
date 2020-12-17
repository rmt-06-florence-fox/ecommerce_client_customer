import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Content from '../views/Content.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Cart from '../views/Cart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: 'Content',
    children: [
      {
        path: '',
        name: 'Content',
        component: Content
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      },
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'carts',
        name: 'Cart',
        component: Cart
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
  const isAuthenticated = localStorage.access_token
  if (to.name === 'Cart' && !isAuthenticated) next({ name: 'Login' })
  else if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) next({ name: 'Home' })
  else next()
})

export default router
