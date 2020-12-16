import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    categories: [],
    editData: null,
    cart: null
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setCategories (state, payload) {
      state.categories = payload
    },
    setCart (state, payload) {
      state.cart = payload
    }
  },
  actions: {
    register (context, payload) {
      axios({
        method: 'POST',
        url: '/register',
        data: payload
      })
        .then(({ data }) => {
          router.push({ name: 'Login' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    login (context, payload) {
      axios({
        method: 'POST',
        url: '/user/login',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    getProducts (context) {
      axios({
        method: 'GET',
        url: '/products'
      })
        .then(({ data }) => {
          context.commit('setProducts', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getCategories (context) {
      axios({
        method: 'GET',
        url: '/categories'
      })
        .then(({ data }) => {
          context.commit('setCategories', data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
