import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    shopList: [],
    isLoggedIn: null
  },
  mutations: {
    getProducts (state, payload) {
      state.products = payload
    },

    setLoggedIn (state, payload) {
      state.isLoggedIn = payload
    },

    getOrders (state, payload) {
      state.shopList = payload
    }
  },
  actions: {
    login (context, payload) {
      axios({
        url: 'https://cryptic-wildwood-90967.herokuapp.com/users/login',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token)
          context.commit('setLoggedIn', true)
          console.log('Logged In!')
          return Swal.fire({
            title: 'Logged In',
            text: 'Login Successfull!',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        })
        .then(_ => {
          router.push('/')
        })
        .catch(err => {
          Swal.fire({
            title: 'Error',
            text: err.response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        })
    },

    register (context, payload) {
      axios({
        url: 'https://cryptic-wildwood-90967.herokuapp.com/users/register',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(response => {
          return Swal.fire({
            title: 'Register',
            text: 'Register Successfull!',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        })
        .then(_ => {
          router.push('/users/login')
        })
        .catch(err => {
          Swal.fire({
            title: 'Error',
            text: err.response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        })
    },

    fetchProducts (context) {
      axios({
        url: 'https://cryptic-wildwood-90967.herokuapp.com/products',
        method: 'GET'
      })
        .then(response => {
          context.commit('getProducts', response.data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    addOrder (context, payload) {
      axios({
        url: 'https://cryptic-wildwood-90967.herokuapp.com/products/order',
        method: 'POST',
        data: {
          productId: payload.productId,
          quantity: payload.quantity
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          console.log(response.data)
          context.dispatch('fetchOrder')
        })
        .catch(err => {
          Swal.fire({
            title: 'Error',
            text: err.response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        })
    },

    updateQuantity (context, payload) {
      axios({
        url: 'https://cryptic-wildwood-90967.herokuapp.com/products/order',
        method: 'PATCH',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          orderId: payload.orderId,
          quantity: payload.quantity
        }
      })
        .then(response => {
          context.dispatch('fetchOrder')
        })
        .catch(err => {
          Swal.fire({
            title: 'Error',
            text: err.response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        })
    },

    deleteOrder (context, payload) {
      axios({
        url: 'https://cryptic-wildwood-90967.herokuapp.com/products/order',
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          id: payload
        }
      })
        .then(response => {
          return Swal.fire({
            title: 'Success',
            text: response.data.message,
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        })
        .then(_ => {
          context.dispatch('fetchOrder')
        })
        .catch(err => {
          Swal.fire({
            title: 'Error',
            text: err.response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        })
    },

    fetchOrder (context) {
      axios({
        url: 'https://cryptic-wildwood-90967.herokuapp.com/products/order',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          context.commit('getOrders', response.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
