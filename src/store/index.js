import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosInstance'
import router from '../router'
import Snotify from 'vue-snotify'
Vue.use(Snotify)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    isLogin: false,
    cartNotif: [],
    access_token: { access_token: localStorage.getItem('access_token') },
    total: 0
  },
  mutations: {
    showProducts (state, payload) {
      state.products = payload
    },
    showCarts (state, payload) {
      state.carts = payload
    },
    isLoginChange (state, payload) {
      state.isLogin = payload
    },
    cartNotif (state, payload) {
      state.cartNotif = payload
    },
    addTotal (state, payload) {
      let total = 0
      state.carts.forEach(el => {
        total += el.total
      })
      state.total = total
    }
  },
  actions: {
    fetchProducts (context) {
      axios({
        method: 'GET',
        url: '/products'
      })
        .then(({ data }) => {
          context.commit('showProducts', data)
        })
        .catch(xhr => {
          console.log(xhr)
        })
    },
    fetchCart (context) {
      axios({
        method: 'GET',
        url: '/carts',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('showCarts', data)
          context.commit('addTotal')
        })
        .catch(xhr => {
          console.log(xhr)
        })
    },
    Login (context, payload) {
      axios({
        method: 'POST',
        url: '/login',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          context.commit('isLoginChange', true)
          router.push({ name: 'Home' })
          context.$snotify.info({
            Please: 'Login or Register First'
          })
        })
        .catch(xhr => {
          console.log(xhr)
        })
    },
    Register (context, payload) {
      axios({
        method: 'POST',
        url: '/register',
        data: payload
      })
        .then(({ data }) => {
          router.push({ name: 'Login' })
        })
        .catch(xhr => {
          console.log(xhr)
        })
    },
    logout (context, payload) {
      localStorage.clear()
      router.push({ name: 'Home' })
    },
    addToCart (context, payload) {
      axios({
        method: 'POST',
        url: '/carts',
        data: payload,
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          context.commit('cartNotif', 'x')
          context.dispatch('fetchProducts')
          context.dispatch('fetchCart')
        })
        .catch(xhr => {
          console.log(xhr)
        })
    },
    deleteCartById (context, payload) {
      axios({
        method: 'DELETE',
        url: `/carts/${payload}`,
        data: payload,
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          context.dispatch('fetchCart')
        })
        .catch(xhr => {
          console.log(xhr)
        })
    },
    updateStock (context, payload) {
      axios({
        method: 'PUT',
        url: `/carts/${payload.id}`,
        data: {
          ProductId: payload.ProductId,
          Price: payload.Price,
          isPlus: payload.isPlus
        },
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          context.dispatch('fetchCart')
        })
        .catch(xhr => {
          console.log(xhr.response)
        })
    }
  },
  modules: {
  }
})
