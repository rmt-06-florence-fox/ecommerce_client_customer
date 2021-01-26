import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/api.js'
import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    isLogin: false
  },
  mutations: {
    setProduct (state, payload) {
      state.products = payload
    },
    setCart (state, payload) {
      state.carts = payload
    },
    setLogin (state, payload) {
      state.isLogin = payload
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
          context.commit('setLogin', true)
          router.push('/')
        })
        .catch(error => {
          console.log(error)
        })
    },

    register (context, payload) {
      axios({
        method: 'POST',
        url: '/register',
        data: payload
      })
        .then(({ data }) => {
          router.push('/login')
        })
        .catch(error => {
          console.log(error)
        })
    },

    fetchProduct (context) {
      axios({
        method: 'GET',
        url: 'products'
      })
        .then(({ data }) => {
          console.log(data, '>>>storefetch')
          context.commit('setProduct', data)
        })
        .catch(error => {
          console.log(error)
        })
    },

    fetchCart (context) {
      axios({
        method: 'GET',
        url: 'cart',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('setCart', data)
        })
        .catch(error => {
          console.log(error)
        })
    },

    addToCart (context, ProductId) {
      axios({
        method: 'POST',
        url: 'cart',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          ProductId
        }
      })
        .then(Response => {
          console.log(Response)
          context.dispatch('fetchCart')
        })
        .catch(error => {
          console.log(error)
        })
    },

    incrementCart (context, ProductId) {
      axios({
        method: 'PATCH',
        url: `cart/${ProductId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          increment: true
        }
      })
        .then(Response => {
          console.log(Response)
          context.dispatch('fetchCart')
        })
        .catch(error => {
          console.log(error)
        })
    },

    decrementCart (context, ProductId) {
      axios({
        method: 'PATCH',
        url: `cart/${ProductId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          increment: false
        }
      })
        .then(Response => {
          console.log(Response)
          context.dispatch('fetchCart')
        })
        .catch(error => {
          console.log(error)
        })
    },

    removeCart (context, ProductId) {
      axios({
        method: 'DELETE',
        url: `cart/${ProductId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(Response => {
          console.log(Response)
          context.dispatch('fetchCart')
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
