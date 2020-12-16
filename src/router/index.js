import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/MainPage.vue'
import NotFound from '../views/NotFound.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
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
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const authenticated = localStorage.access_token
  if (to.name !== 'Login' && to.name !== 'MainPage' && to.name !== 'Register' && !authenticated) next({ name: 'Login' })
  else if (to.name === 'Login' && to.name === 'Register' && authenticated) next({ next: 'MainPage' })
  else next()
})

export default router
