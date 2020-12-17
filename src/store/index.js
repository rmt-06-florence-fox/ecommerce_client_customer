import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosInstance'
// import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    showProducts (state, payload) {
      state.products = payload
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
    }
  },
  modules: {
  }
})
