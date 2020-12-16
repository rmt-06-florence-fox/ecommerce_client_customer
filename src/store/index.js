import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosInstance'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    listProducts: []
  },
  mutations: {
    CHANGE_IS_LOGIN (state, payload) {
      state.isLogin = payload
    },
    FETCH_PRODUCTS (state, payload) {
      state.listProducts = payload
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
      axios({
        url: '/products',
        method: 'get'
      })
        .then(res => {
          context.commit('FETCH_PRODUCTS', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
