import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosconfig'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: []
  },
  mutations: {
    set_products (state, payload) {
      state.products = payload
    },
    set_cart (state, payload) {
      state.cart = payload
    }
  },
  actions: {
    doSignIn (context, payload) {
      return axios({
        url: 'signin',
        method: 'post',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          router.push('home')
        })
        .catch(err => console.log(err))
    },
    doSignUp (context, payload) {
      return axios({
        url: 'signup',
        method: 'post',
        data: payload
      })
        .then(() => router.push('/'))
        .catch(err => console.log(err))
    },
    fetchProducts (context, payload) {
      return axios({
        url: 'products',
        method: 'get'
      })
        .then(({ data }) => {
          context.commit('set_products', data)
        })
        .catch(err => console.log(err))
    },
    fetchCart (context, payload) {
      return axios({
        url: 'cart',
        method: 'get',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('set_cart', data)
        })
        .catch(err => console.log(err))
    },
    addToCart (context, id) {
      return axios({
        url: `cart/${id}`,
        method: 'post',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(() => {
          context.dispatch('fetchCart')
        })
        .catch(err => console.log(err))
    },
    updateCart (context, id) {
      return axios({
        url: `cart/${id}`,
        method: 'put',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(() => {
          context.dispatch('fetchCart')
        })
        .catch(err => console.log(err))
    }
  },
  modules: {
  }
})
