import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    banners: [],
    products: [],
    carts: [],
    history: []
  },
  mutations: {
    setLoggedIn (state, data) {
      state.loggedIn = data
    },
    set_banners (state, data) {
      state.banners = data
    },
    set_products (state, data) {
      state.products = data
    },
    set_cart (state, data) {
      state.carts = data
    },
    set_history (state, data) {
      state.history = data
    }
  },
  actions: {
    login (context, data) {
      return axios({
        method: 'POST',
        url: '/login/customer',
        data: data
      })
    },
    register (context, data) {
      return axios({
        method: 'POST',
        url: '/register',
        data: data
      })
    },
    getBanners (context) {
      axios({
        method: 'GET',
        url: '/banners/active'
      })
        .then(({ data }) => {
          context.commit('set_banners', data)
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
          context.commit('set_products', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCart (context) {
      const token = localStorage.getItem('access_token')
      axios({
        method: 'GET',
        url: '/carts',
        headers: {
          access_token: token
        }
      })
        .then(({ data }) => {
          context.commit('set_cart', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart (context, id) {
      const token = localStorage.getItem('access_token')
      return axios({
        method: 'POST',
        url: '/carts',
        headers: {
          access_token: token
        },
        data: {
          ProductId: id,
          quantity: 1
        }
      })
    },
    updateCart (context, payload) {
      const token = localStorage.getItem('access_token')
      return axios({
        method: 'POST',
        url: '/carts',
        headers: {
          access_token: token
        },
        data: payload
      })
    },
    deleteCart (context, id) {
      const token = localStorage.getItem('access_token')
      return axios({
        method: 'DELETE',
        url: `/carts/${id}`,
        headers: {
          access_token: token
        }
      })
    },
    checkout (context, data) {
      const token = localStorage.getItem('access_token')
      return axios({
        method: 'DELETE',
        url: '/carts/checkout',
        headers: {
          access_token: token
        },
        data: {
          total: data
        }
      })
    },
    getHistory (context) {
      const token = localStorage.getItem('access_token')
      axios({
        method: 'GET',
        url: '/carts/history',
        headers: {
          access_token: token
        }
      })
        .then(({ data }) => {
          context.commit('set_history', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
