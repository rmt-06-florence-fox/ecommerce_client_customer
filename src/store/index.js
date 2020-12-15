import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosins'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    products: []
  },
  mutations: {
    setStatus (state, payload) {
      console.log(payload)
      state.status = payload
    },
    setProducts (state, payload) {
      state.products = payload
    }
  },
  actions: {
    login (context, payload) {
      console.log(payload)
      axios({
        url: '/logincustomer',
        method: 'post',
        data: payload
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('access_token', data.access_token)
          context.commit('setStatus', 'loggedIn')
          if (router.history.current.name !== 'Home') {
            router.push('/')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    register (context, payload) {
      console.log(payload)
      axios({
        url: '/register',
        method: 'post',
        data: payload
      })
        .then(({ data }) => {
          console.log(data)
          router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetch (context, payload) {
      axios({
        url: '/products',
        method: 'get'
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('setProducts', data.products)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
