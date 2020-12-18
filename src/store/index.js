import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosInstance'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    statusLogin: false,
    totalPrice: 0,
    access_token: localStorage.getItem('access_token')
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setStatus (state, payload) {
      state.statusLogin = payload
    },
    setCarts (state, payload) {
      state.carts = payload
    },
    setTotal (state, payload) {
      let totalPrice = 0
      state.carts.forEach(el => {
        totalPrice += el.total
      })
      state.totalPrice = totalPrice
    }
  },
  actions: {
    login (context, payload) {
      axios({
        method: 'POST',
        url: '/login',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          context.commit('setStatus', true)
          router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    register (context, payload) {
      return axios({
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
    fetchProduct (context) {
      axios({
        method: 'GET',
        url: '/products'
      })
        .then(({ data }) => {
          context.commit('setProducts', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchCart (context) {
      axios({
        method: 'GET',
        url: '/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setCarts', data)
          context.commit('setTotal')
        })
        .catch(err => {
          console.log(err)
        })
    },
    addCart (context, payload) {
      axios({
        method: 'POST',
        url: '/carts',
        data: payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.dispatch('fetchProduct')
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateCart (context, payload) {
      console.log('masuk')
      axios({
        method: 'PUT',
        url: `/carts/${payload.id}`,
        data: {
          ProductId: payload.ProductId,
          price: payload.total,
          status: payload.status
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.dispatch('fetchCart')
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    deleteCart (context, id) {
      axios({
        method: 'DELETE',
        url: `/carts/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.dispatch('fetchCart')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
