import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    banners: '',
    categories: '',
    cart: [],
    logged: false,
    history: '',
    products: '',
    wishlist: ''
  },
  mutations: {
    login (state, boolean) {
      state.logged = boolean
    },
    insertBanners (state, payload) {
      state.banners = payload
    },
    insertCategories (state, payload) {
      state.categories = payload
    },
    insertCart (state, payload) {
      state.cart = payload
    },
    insertHistory (state, payload) {
      state.history = payload
    },
    insertProducts (state, payload) {
      state.products = payload
    },
    insertWishlist (state, payload) {
      state.wishlist = payload
    }
  },
  actions: {
    checkout (context) {
      const token = localStorage.getItem('token')
      return axios({
        method: 'PATCH',
        url: '/checkout',
        headers: {
          token
        }
      })
    },
    addToWishList (context, productId) {
      const token = localStorage.getItem('token')
      axios({
        method: 'POST',
        url: 'wishlist',
        headers: {
          token
        },
        data: {
          ProductId: productId
        }
      })
      .then(result => {
        context.dispatch('getProducts')
        context.dispatch('getWishlist')
      })
      .catch(err => {
        console.log(err)
      })
    },
    addToCart (context, productId) {
      const token = localStorage.getItem('token')
      axios({
        method: 'POST',
        url: '/cart',
        headers: {
          token
        },
        data: {
          ProductId: productId
        }
      })
      .then(result => {
        context.dispatch('getCart')
      })
      .catch(err => {
        console.log(err)
      })
    },
    decrementAmount (context, productId) {
      const token = localStorage.getItem('token')
      return axios({
        method: 'PATCH',
        url: '/cart/' + productId,
        headers: {
          token
        },
        data: {
          total: false
        }
      })
    },
    getBanners (context) {
      axios({
        method: 'GET',
        url: '/banners/status'
      })
      .then(result => {
        context.commit('insertBanners', result.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getCart (context) {
      const token = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: '/cart',
        headers: {
          token
        }
      })
      .then(result => {
        context.commit('insertCart', result.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getCategories (context) {
      axios({
        method: 'GET',
        url: '/category'
      })
      .then(result => {
        context.commit('insertCategories', result.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getHistory (context) {
      const token = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: '/history',
        headers: {
          token
        }
      })
      .then(result => {
        context.commit('insertHistory', result.data)
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
      .then(result => {
        context.commit('insertProducts', result.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getWishlist (context) {
      const token = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: '/wishlist',
        headers: {
          token
        }
      })
      .then(result => {
        context.commit('insertWishlist', result.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    incrementAmount (context, productId) {
      const token = localStorage.getItem('token')
      return axios({
        method: 'PATCH',
        url: '/cart/' + productId,
        headers: {
          token
        },
        data: {
          total: true
        }
      })
    },
    login (context, payload) {
      const {email, password} = payload
      return axios({
        method: 'POST',
        url: '/customerLogin',
        data: {
          email, password
        }
      })
    },
    register (context, payload) {
      if(payload.gender === 'Any') {
        payload.gender = ''
      }
      return axios({
        methods: 'POST',
        url: '/customerRegister',
        data: {
          firstName: payload.firstName,
          lastName: payload.lastName,
          gender: payload.gender,
          email: payload.email,
          password: payload.password
        }
      })
    },
    removeFromCart (context, productId) {
      const token = localStorage.getItem('token')
      return axios({
        method: 'DELETE',
        url: '/cart/' + productId,
        headers: {
          token
        }
      })
    },
    removeFromWishlist (context, productId) {
      const token = localStorage.getItem('token')
      axios({
        method: 'DELETE',
        url: '/wishlist/' + productId,
        headers: {
          token
        }
      })
      .then(result => {
        context.dispatch('getProducts')
        context.dispatch('getWishlist')
      })
    }
  },
  modules: {
  }
})
