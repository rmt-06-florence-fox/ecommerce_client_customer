import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios/axiosInstance'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    isLogin: false
  },
  mutations: {
    SET_PRODUCT (state, payload) {
    },
    GET_PRODUCTS (state, payload) {
      state.products = payload
    },
    GET_CART (state, payload) {
      state.cart = payload
    },
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    login (context, payload) {
      return axios({
        method: 'post',
        url: '/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    fetchProducts (context) {
      const token = localStorage.getItem('access_token')
      axios({
        method: 'get',
        url: '/products',
        headers: { access_token: token }
      })
        .then(({ data }) => {
          context.commit('GET_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getProductById (context, id) {
      const token = localStorage.getItem('access_token')
      return axios({
        method: 'get',
        url: '/products/' + id,
        headers: { access_token: token }
      })
    },
    updateProduct (context, payload) {
      const token = localStorage.getItem('access_token')
      return axios({
        method: 'put',
        url: '/products/' + payload.id,
        headers: { access_token: token },
        data: {
          id: payload.id,
          stock: payload.stock,
          price: payload.price,
          name: payload.name,
          description: payload.description,
          image: payload.image
        }
      })
    },
    register (context, payload) {
      return axios({
        method: 'post',
        url: '/register',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    fetchCart (context, payload) {
      const token = localStorage.getItem('access_token')
      axios({
        method: 'get',
        url: '/carts',
        headers: { access_token: token }
      })
        .then(({ data }) => {
          context.commit('GET_CART', data)
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart (context, payload) {
      const token = localStorage.getItem('access_token')
      axios({
        method: 'post',
        url: '/carts',
        headers: { access_token: token },
        data: payload
      })
        .then(() => {
          context.dispatch('fetchCart')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteCart (context, payload) {
      const token = localStorage.getItem('access_token')
      axios({
        method: 'delete',
        url: '/carts/' + payload,
        headers: { access_token: token }
      })
        .then(({ data }) => {
          console.log('pengetesan')
          context.dispatch('fetchCart')
          // console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
