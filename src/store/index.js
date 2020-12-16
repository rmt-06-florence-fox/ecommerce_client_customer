import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosInstance.js'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errors: null,
    products: []
  },
  mutations: {
    set_errors (state, payload) {
      state.errors = payload
    },
    set_products (state, payload) {
      state.products = payload
    }
  },
  actions: {
    login (context, payload) {
      axios({
        url: '/customer/login',
        method: 'post',
        data: payload
      })
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token)
          context.dispatch('fetchProducts')
          router.push('/customer')
        })
        .catch(err => {
          context.commit('set_errors', err.response.data)
        })
    },
    register (context, payload) {
      axios({
        url: '/customer/register',
        method: 'post',
        data: payload
      })
        .then(response => {
          router.push('/login')
        })
        .catch(err => {
          context.commit('set_errors', err.response.data)
        })
    },
    logout (context) {
      localStorage.clear()
      router.push('/')
    },
    fetchProducts (context) {
      axios({
        url: '/products',
        method: 'get'
      })
        .then(response => {
          context.commit('set_products', response.data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  },
  modules: {
  }
})
