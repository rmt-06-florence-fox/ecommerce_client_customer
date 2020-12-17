import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from '../config/config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    totalPrice: 0
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload.data
      state.totalPrice = payload.totalPrice
    }
  },
  actions: {
    userLogin (context, payload) {
      axios({
        method: 'POST',
        url: 'login',
        data: payload
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('access_token', data.access_token)
          router.push('/')
        })
        .catch(err => console.log(err))
    },
    userRegister (context, payload) {
      axios({
        method: 'POST',
        url: 'register',
        data: payload
      })
        .then(({ data }) => {
          console.log(data)
          router.push('/login')
        })
        .catch(err => console.log(err))
    },
    fetchProducts (context, payload) {
      axios({
        method: 'GET',
        url: 'products'
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCTS', data)
        })
        .catch(err => console.log(err))
    },
    fetchCarts (context, payload) {
      axios({
        method: 'GET',
        url: 'cart',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((response) => {
          console.log(response)
          const data = response.data.data
          const totalPrice = response.data.totalPrice
          const payload = {
            data, totalPrice
          }
          context.commit('SET_CARTS', payload)
        })
        .catch(err => console.log(err))
    },
    addToCart (context, payload) {
      axios({
        method: 'POST',
        url: 'cart',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: payload
      })
        .then(({ data }) => {
          console.log(data)
          context.dispatch('fetchCarts')
        })
        .catch(err => console.log(err))
    },
    checkoutCarts (context) {
      axios({
        method: 'POST',
        url: 'cart/checkout',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          context.dispatch('fetchCarts')
        })
        .catch(err => console.log(err))
    }
  },
  modules: {
  }
})
