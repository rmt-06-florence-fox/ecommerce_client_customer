import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'JAM TANGEN',
    user: [],
    products: [],
    categories: []
  },
  mutations: {
    setUser (state, value) {
      state.user = value
    },
    setProducts (state, value) {
      state.products = value
    },
    setCategories (state, value) {
      state.categories = value
    }
  },
  actions: {
    loadProducts (context) {
      axios({
        method: 'get',
        url: '/product'
      })
        .then(res => {
          context.commit('setProducts', res.data.products)
        })
    },
    loadUser (context) {
      axios({
        method: 'get',
        url: '/user',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          context.commit('setUser', res.data)
        })
    },
    loadCategories (context) {
      axios({
        method: 'get',
        url: '/categories'
      })
        .then(res => {
          context.commit('setCategories', res.data)
        })
    }
  },
  modules: {
  }
})
