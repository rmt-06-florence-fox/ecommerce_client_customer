import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios/axiosconfig'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    images: [],
    loginStatus: false,
    carts: [],
    cartsHistory: []
  },
  mutations: {
    setProduct (state, payload) {
      state.products = payload
    },
    setImage (state, payload) {
      state.images = payload
    },
    setStatus (state, payload) {
      state.loginStatus = payload
    },
    setCarts (state, payload) {
      state.carts = payload
    },
    setHistory (state, payload) {
      state.cartsHistory = payload
    }
  },
  actions: {
    fetchProduct (context) {
      axios({
        method: 'get',
        url: '/products'
      })
        .then(({ data }) => {
          context.commit('setProduct', data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    login (context, payload) {
      return axios({
        method: 'post',
        url: '/signin',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    register (context, payload) {
      return axios({
        method: 'post',
        url: '/signup',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    addCart (context, payload) {
      console.log(payload)
      const token = localStorage.getItem('access_token')
      return axios({
        method: 'post',
        url: '/carts',
        data: {
          ProductId: payload.ProductId,
          quantity: payload.quantity
        },
        headers: {
          access_token: token
        }
      })
    },
    fetchCart (context) {
      const token = localStorage.getItem('access_token')
      axios({
        method: 'get',
        url: '/carts',
        headers: {
          access_token: token
        }
      })
        .then(({ data }) => {
          context.commit('setCarts', data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    updateCart (context, payload) {
      const token = localStorage.getItem('access_token')
      return axios({
        method: 'put',
        url: `/carts/${payload.id}`,
        data: {
          quantity: payload.quantity
        },
        headers: {
          access_token: token
        }
      })
    },
    deleteCart (context, payload) {
      const token = localStorage.getItem('access_token')
      return axios({
        method: 'delete',
        url: `/carts/${payload.id}`,
        headers: {
          access_token: token
        }
      })
    },
    checkout (context) {
      const token = localStorage.getItem('access_token')
      return axios({
        method: 'patch',
        url: '/carts',
        headers: {
          access_token: token
        }
      })
    },
    fetchHistory (context) {
      const token = localStorage.getItem('access_token')
      axios({
        method: 'get',
        url: '/carts/history',
        headers: {
          access_token: token
        }
      })
        .then(({ data }) => {
          context.commit('setHistory', data)
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  getters: {
    totalPayment (state) {
      let total = 0
      state.carts.forEach(el => {
        total += el.Product.price * el.quantity
      })
      return total
    }
  },
  modules: {
  }
})
