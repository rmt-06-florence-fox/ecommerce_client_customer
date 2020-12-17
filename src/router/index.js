import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/landing',
    name: 'Landing',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Landing.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/wishlist',
        name: 'Wishlist',
        component: () => import('../components/Wishlist.vue')
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('../components/Cart.vue')
      },
      {
        path: '/history',
        name: 'History',
        component: () => import('../components/History.vue')
      },
      {
        path: '/:category',
        name: 'SpesificProducts',
        component: () => import('../components/SpesificProducts.vue')
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
