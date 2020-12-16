import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosInstance.js'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    }
  },
  actions: {
    register (context, payload) {
      axios({
        method: 'POST',
        // url: 'https://ecommerce-sandy.herokuapp.com/login',
        url: 'http://localhost:3000/customer/register',
        data: payload
      })
        .then(({ data }) => {
          console.log(data)
          router.push('/login')
        })
        .catch(err => {
          console.log(err)
        })
    },
    login (context, payload) {
      axios({
        method: 'POST',
        // url: 'https://ecommerce-sandy.herokuapp.com/login',
        url: 'http://localhost:3000/customer/login',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchProduct (context) {
      axios({
        method: 'GET',
        // url: 'https://ecommerce-sandy.herokuapp.com/products',
        url: 'http://localhost:3000/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setProducts', data)
        })
        .catch(err => console.log(err))
    }
  },
  modules: {
  }
})
