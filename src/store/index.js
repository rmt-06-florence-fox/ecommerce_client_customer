import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    registerCustomer ({ commit }, payload) {
      return axios({
        method: 'post',
        url: 'http://localhost:3000/registercustomer',
        data: payload
      })
    },

    login ({ commit }, payload) {
      return axios({
        method: 'post',
        url: 'http://localhost:3000/registercustomer',
        data: payload
      })
    }
  },
  modules: {
  }
})
