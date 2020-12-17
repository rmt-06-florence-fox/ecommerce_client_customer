import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosInstance'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    listProducts: [],
    listCarts: [],
    totalCheckout: 0,
    wishlists: []
  },
  mutations: {
    CHANGE_IS_LOGIN (state, payload) {
      state.isLogin = payload
    },
    FETCH_PRODUCTS (state, payload) {
      state.listProducts = payload
    },
    FETCH_CARTS (state, payload) {
      state.listCarts = payload
    },
    FETCH_TOTAL_CHECKOUT (state, payload) {
      state.totalCheckout = payload[0].totalCheckout
    },
    FETCH_WISHLISTS (state, payload) {
      state.wishlists = payload
    }
  },
  actions: {
    register (context, obj) {
      return axios({
        url: '/register',
        method: 'post',
        data: {
          name: obj.name,
          email: obj.email,
          password: obj.password
        }
      })
    },
    login (context, obj) {
      return axios({
        url: '/login',
        method: 'post',
        data: {
          email: obj.email,
          password: obj.password
        }
      })
    },
    fetchProduct (context) {
      return axios({
        url: '/products',
        method: 'get',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    getProduct (context, id) {
      return axios({
        url: `/products/${id}`,
        method: 'get',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    getCart (context, id) {
      return axios({
        url: `/carts/${id}`,
        method: 'get',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    fetchCart (context) {
      return axios({
        url: '/carts',
        method: 'get',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    addCart (context, id) {
      return axios({
        url: `/carts/${id}`,
        method: 'post',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    plusCart (context, id) {
      return axios({
        url: `/carts/${id}/plus`,
        method: 'put',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    minusCart (context, id) {
      return axios({
        url: `/carts/${id}/minus`,
        method: 'put',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    deleteCart (context, id) {
      return axios({
        url: `/carts/${id}`,
        method: 'delete',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    addWishlist (context, id) {
      return axios({
        url: `/wishlists/${id}`,
        method: 'post',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    fetchWishlists (context) {
      return axios({
        url: '/wishlists',
        method: 'get',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    deleteWishlist (context, id) {
      return axios({
        url: `/wishlists/${id}`,
        method: 'delete',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    }
  },
  modules: {
  }
})
