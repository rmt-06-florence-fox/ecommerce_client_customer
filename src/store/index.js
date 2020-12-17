import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosInstance'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    isLogin: false,
    cart: [],
    cartById: [],
    history: [],
    addTotalPrice: 0,
    currentPrice: 0,
    updatePrice: false,
    banners: [],
    disableAddToCart: false
  },
  mutations: {
    setProducts (state, data) {
      state.products = data
    },
    setIsLogin (state, bool) {
      state.isLogin = bool
    },
    setCart (state, data) {
      state.cart = data
    },
    setHistory (state, data) {
      state.history = data
    },
    addTotalPrice (state, number) {
      state.addTotalPrice = number
    },
    setUpdatePrice (state, bool) {
      state.updatePrice = bool
    },
    setCurrentPrice (state, total) {
      state.currentPrice = total
    },
    setBanners (state, data) {
      state.banners = data
    },
    setCartById (state, data) {
      state.cartById = data
    },
    setDisableAddToCart (state, bool) {
      state.disableAddToCart = bool
    }
  },
  actions: {
    login (context, payload) {
      axios({
        method: 'POST',
        url: '/login',
        data: payload
      })
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token)
          router.push({ name: 'Home' })
          context.commit('setIsLogin', true)
          // this.fetchProducts()
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchProducts (context) {
      axios({
        method: 'GET',
        url: '/products'
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('setProducts', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout (context) {
      localStorage.clear()
      router.push({ name: 'Home' }).catch(() => {})
      // this.fetchProducts()
    },
    register (context, obj) {
      axios({
        method: 'POST',
        url: '/register',
        data: {
          email: obj.email,
          password: obj.password
        }
      })
        .then(_ => {
          router.push({ name: 'Login' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchCart (context) {
      return axios({
        method: 'GET',
        url: '/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    fetchHistory (context) {
      axios({
        method: 'GET',
        url: '/history',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setHistory', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addCart (context, obj) {
      return axios({
        method: 'POST',
        url: '/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          name: obj.name,
          imageUrl: obj.imageUrl,
          price: obj.price,
          quantity: obj.quantity,
          ProductId: obj.ProductId
        }
      })
    },
    decrementItem (context, obj) {
      return axios({
        method: 'POST',
        url: '/carts/decrement',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          name: obj.name,
          imageUrl: obj.imageUrl,
          price: obj.price,
          quantity: obj.quantity,
          ProductId: obj.ProductId
        }
      })
    },
    destroyCart (context, id) {
      return axios({
        method: 'DELETE',
        url: '/carts/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    addHistory (context, obj) {
      return axios({
        method: 'POST',
        url: '/history',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          data: obj.data
        }
      })
    },
    updateProduct (context, obj) {
      axios({
        method: 'PUT',
        url: '/products/' + obj.id,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          name: obj.name,
          imageUrl: obj.imageUrl,
          price: obj.price,
          stock: obj.stock
        }
      })
        .then(_ => {
          router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    clearHistory (context, id) {
      return axios({
        method: 'DELETE',
        url: '/history',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    fetchBanners (context) {
      axios({
        method: 'GET',
        url: '/banners',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(data => {
          context.commit('setBanners', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    loginGoogle (context, googleToken) {
      return axios({
        method: 'POST',
        url: '/googleLogin',
        data: {
          googleToken
        }
      })
    },
    fetchCartById (context, ProductId) {
      return axios({
        method: 'GET',
        url: '/carts/' + ProductId,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    }
  },
  modules: {
  }
})
