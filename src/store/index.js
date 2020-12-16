import Vue from 'vue'
import Vuex from 'vuex'
// import router from '../router'
import axios from '../config/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    histories: [],
    errorLogin: '',
    isLogin: false
  },
  mutations: {
    SET_products (state, payload) {
      //
    },
    SET_carts (state, payload) {
      //
    },
    SET_histories (state, payload) {
      //
    },
    SET_errorLogin (state, payload) {
      //
    },
    SET_isLogin (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    login (context, payload) {
      axios({
        url: '/login2',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          router.push('/')
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    logout (context, payload) {
      localStorage.removeItem('access_token')
      context.commit('SET_isLogin', false)
      router.push('/')
    },
    register (context, payload) {
      axios({
        url: '/register',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          router.push('/login')
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getProduct (context, payload) {
      axios({
        url: '/products',
        method: 'GET'
      })
        .then(({ data }) => {
          context.commit('SET_products', data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getCart (context, payload) {
      axios({
        url: '/carts',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_carts', data)
        })
        .catch(err => {
          console.log(err.response)
          router.push('/')
        })
    },
    getHistory (context, payload) {
      axios({
        url: '/carts/history',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_histories', data)
        })
        .catch(err => {
          console.log(err.response)
          router.push('/')
        })
    },
    postCheckout (context, payload) {
      axios({
        url: '/carts/checkout',
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          router.push('/history')
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    postProductId (context, payload) {
      axios({
        url: `/carts/${payload.id}`,
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    patchCartId (context, payload) {
      axios({
        url: `/carts/${payload.id}`,
        method: 'PATCH',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          value: payload.value
        }
      })
        .then(({ data }) => {
          context.dispatch('getCart')
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    deleteCartId (context, payload) {
      axios({
        url: `/carts/${payload.id}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.dispatch('getCart')
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  modules: {
  },
  getters: {
  }
})
