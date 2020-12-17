import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: []
  },
  mutations: {
    fetchProduct (state, payload) {
      state.products = payload
    },
    fetchCart (state, payload) {
      state.carts = payload
    }
  },
  actions: {
    fetchProduct (context) {
      axios({
        url: 'http://localhost:3000/product',
        method: 'GET'
      })
        .then(({ data }) => {
          context.commit('fetchProduct', data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    fetchCart (context) {
      console.log('<<<<<<<<<<<<<<< masuk store')
      axios({
        url: 'http://localhost:3000/cart',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data, '<<<<<<<<<<<<<<data cart')
          context.commit('fetchCart', data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    removeCart (context, payload) {
      console.log('<<<<<<<<<<<<<<< masuk store')
      axios({
        url: 'http://localhost:3000/cart',
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          id: payload.id
        }
      })
        .then(({ data }) => {
          console.log(data, '<<<<<<<<<<<<<<data cart')
          context.commit('fetchCart', data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addCart (context, payload) {
      console.log('<<<<<<<<<<<<<<< masuk store')
      axios({
        url: 'http://localhost:3000/cart',
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          ProductId: payload.ProductId,
          quantity: 1
        }
      })
        .then(({ data }) => {
          console.log(data, '<<<<<<<<<<<<<<data cart')
          context.commit('fetchCart', data)
          router.push({ path: '/cart' })
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateCart (context, payload) {
      console.log('<<<<<<<<<<<<<<< masuk store update cart')
      axios({
        url: 'http://localhost:3000/cart',
        method: 'PATCH',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          ProductId: payload.ProductId,
          quantity: payload.quantity,
          status: payload.status
        }
      })
        .then(({ data }) => {
          console.log(data, '<<<<<<<<<<<<<<data cart')
          context.commit('fetchCart', data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    login (context, payload) {
      axios({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(data => {
          localStorage.setItem('access_token', data.data)
          router.push({ path: '/' })
        })
        .catch(error => {
          console.log(error)
        })
    },
    register (context, payload) {
      axios({
        url: 'http://localhost:3000/register',
        method: 'POST',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password
        }
      })
        .then(data => {
          router.push('/login')
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
