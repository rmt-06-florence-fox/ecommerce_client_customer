import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    author: 'Arul Abdul Aziz',
    products: [],
    carts: [],
    totelPrice: 0
  },
  mutations: {
    set_product (state, payload) {
      state.products = payload
    },
    set_carts (state, payload) {
      state.carts = payload
    },
    set_totalPrice (state, payload) {
      state.totelPrice = payload
    }
  },
  actions: {
    register (context, payload) {
      return axios({
        url: '/register',
        method: 'POST',
        data: payload
      })
    },
    login (context, payload) {
      return axios({
        url: '/login',
        method: 'POST',
        data: payload
      })
    },
    fetchProduct (context) {
      return axios({
        url: '/product',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    addCart (context, payload) {
      return axios({
        url: '/cart',
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: payload
      })
    },
    fetchCart (context) {
      return axios({
        url: '/cart',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    getTotalPrice (context) {
      const carts = this.carts
      context.commit('set_totalPrice', carts)
    },
    deleteCart (context, id) {
      return axios({
        url: '/cart/' + id,
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    patchCart (context, payload) {
      return axios({
        url: '/cart',
        method: 'PATCH',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: payload
      })
    }
  },
  modules: {
  }
})
