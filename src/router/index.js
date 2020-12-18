import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/Home.vue'
import LoginUser from '../views/FormLogin.vue'
import RegisterUser from '../views/FormRegister.vue'
import MainPage from '../views/MainPage.vue'
import CategoryPage from '../components/Categorie.vue'
import CartPage from '../views/Cart.vue'
import ProductFilter from '../views/ProductFilter.vue'
import PageMaintenance from '../views/PageMaintenance.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginUser
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterUser
  },
  {
    path: '/mainpage',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/category',
    name: 'Category',
    component: CategoryPage
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage
  },
  {
    path: '/filter',
    name: 'Filter',
    component: ProductFilter
  },
  {
    path: '/maintenance',
    name: 'Maintenance',
    component: PageMaintenance
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
