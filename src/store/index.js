import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sign: 'login',
    serverUrl: 'https://fancyecome.herokuapp.com/',
    products: [],
    carts: [],
    history: [],
    grandTotal: 0
  },
  mutations: {
    changeSign (state, payload) {
      state.sign = payload
    },
    fetchProduct (state, payload) {
      state.products = payload
    },
    fetchCart (state, payload) {
      state.carts = payload
    },
    changeGrandTotal (state, payload) {
      state.grandTotal = payload
    },
    fetchHistory (state, payload) {
      state.history = payload
    }
  },
  actions: {
    login (context, payload) {
      return axios({
        method: 'POST',
        url: `${context.state.serverUrl}login`,
        data: {
          email: payload.email,
          password: payload.password,
          role: payload.role
        }
      })
    },
    register (context, payload) {
      return axios({
        method: 'POST',
        url: `${context.state.serverUrl}register`,
        data: {
          email: payload.email,
          password: payload.password,
          role: payload.role
        }
      })
    },
    fetchProduct (context) {
      axios({
        method: 'GET',
        url: `${context.state.serverUrl}product`
      })
        .then((response) => {
          context.commit('fetchProduct', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fetchCart (context) {
      axios({
        method: 'GET',
        url: `${context.state.serverUrl}cart`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((response) => {
          context.commit('fetchCart', response.data)
          context.dispatch('countTotalPrice')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addCart (context, payload) {
      return axios({
        method: 'POST',
        url: `${context.state.serverUrl}cart`,
        data: {
          ProductId: payload.ProductId
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    editCart (context, payload) {
      return axios({
        method: 'PATCH',
        url: `${context.state.serverUrl}cart/${payload.id}`,
        data: {
          amount: payload.amount
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    countTotalPrice (context) {
      let temp = 0
      for (let i = 0; i < context.state.carts.length; i++) {
        temp += context.state.carts[i].amount * context.state.carts[i].Product.price
      }
      context.commit('changeGrandTotal', temp)
    },
    removeCart (context, id) {
      return axios({
        method: 'DELETE',
        url: `${context.state.serverUrl}cart/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    checkout (context) {
      return axios({
        method: 'PATCH',
        url: `${context.state.serverUrl}cart`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    fetchHistory (context) {
      axios({
        method: 'GET',
        url: `${context.state.serverUrl}cart/history`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((response) => {
          console.log(response.data)
          context.commit('fetchHistory', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
