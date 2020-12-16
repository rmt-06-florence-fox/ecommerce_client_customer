import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
// import swal from 'sweetalert'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    author: 'Arul Abdul Aziz',
    products: []
  },
  mutations: {
    set_product (state, payload) {
      state.products = payload
    }
  },
  actions: {
    register (context, payload) {
      return axios({
        url: '/register',
        method: 'POST',
        data: payload
      })
    },
    login (context, payload) {
      return axios({
        url: '/login',
        method: 'POST',
        data: payload
      })
    },
    fetchProduct (context) {
      return axios({
        url: '/product',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    addCart (context, payload) {
      return axios({
        url: '/cart',
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: payload
      })
    }
  },
  modules: {
  }
})
