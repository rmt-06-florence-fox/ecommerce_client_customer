import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export default new Vuex.Store({
  state: {
    products: [],
    product: [],
    loginStatus: '',
    carts: [],
    totalPrice: 0,
    transactionList: []
  },
  mutations: {
    fetchProduct (state, data) {
      state.products = data
    },
    findProduct (state, data) {
      state.product = data
    },
    loginStatus (state, data) {
      state.loginStatus = data
    },
    fetchCart (state, data) {
      state.carts = data
    },
    totalPrice (state, data) {
      state.totalPrice = data
    },
    fetchHistory (state, data) {
      state.transactionList = data
    }
  },
  actions: {
    isLoggedIn (context) {
      if (localStorage.getItem('access_token')) {
        return true
      } else {
        return false
      }
    },
    logout (context) {
      context.commit('loginStatus', false)
    },
    register (context, payload) {
      axios({
        method: 'POST',
        url: '/register',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(res => {
          Toast.fire({
            icon: 'success',
            title: 'Register successfully!'
          })
          router.push('/login')
        })
        .catch(err => {
          Toast.fire({
            icon: 'error',
            title: err.message
          })
        })
    },
    login (context, payload) {
      axios({
        method: 'POST',
        url: '/loginCustomer',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(res => {
          Toast.fire({
            icon: 'success',
            title: 'Login successfully!'
          })
          localStorage.setItem('access_token', res.data.access_token)
          context.commit('loginStatus', true)
          return true
        })
        .catch(err => {
          console.log(err)
          Toast.fire({
            icon: 'error',
            title: 'Wrong email or password'
          })
          return false
        })
    },
    fetchData (context) {
      axios({
        method: 'GET',
        url: '/products'
      })
        .then(res => {
          context.commit('fetchProduct', res.data)
        })
        .catch(err => {
          Toast.fire({
            icon: 'error',
            title: err.message
          })
        })
    },
    fetchCart (context) {
      axios({
        method: 'GET',
        url: '/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          console.log(res.data)
          context.commit('fetchCart', res.data)
          let data = 0
          res.data.forEach(e => {
            data += e.price
          })
          context.commit('totalPrice', data)
        })
        .catch(err => {
          Toast.fire({
            icon: 'error',
            title: err.message
          })
        })
    },
    addToCart (context, id) {
      axios({
        method: 'POST',
        url: '/carts/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          quantity: 1
        }
      })
        .then(res => {
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
        })
        .catch(err => {
          Toast.fire({
            icon: 'error',
            title: err.message
          })
        })
    },
    patchCart (context, id) {
      axios({
        method: 'PATCH',
        url: '/carts/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
          this.dispatch('fetchCart')
        })
        .catch(err => {
          console.log(err)
          Toast.fire({
            icon: 'error',
            title: 'Your order has been rejected because it has exceeded the amount of the available stock'
          })
        })
    },
    increase (context, id) {
      axios({
        method: 'PUT',
        url: '/carts/' + id,
        data: {
          quantity: 1,
          info: 'increase'
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
          this.dispatch('fetchCart')
        })
        .catch(err => {
          console.log(err)
          Toast.fire({
            icon: 'error',
            title: 'Your order has been rejected because it has exceeded the amount of available stock of this product'
          })
        })
    },
    decrease (context, id) {
      axios({
        method: 'PUT',
        url: '/carts/' + id,
        data: {
          quantity: -1,
          info: 'decrease'
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
          this.dispatch('fetchCart')
        })
        .catch(err => {
          console.log(err)
          Toast.fire({
            icon: 'error',
            title: 'Please try again later'
          })
        })
    },
    putCart (context, payload) {
      console.log(payload.quantity)
      axios({
        method: 'PUT',
        url: '/carts/' + payload.id,
        data: {
          quantity: payload.quantity
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
          this.dispatch('fetchCart')
        })
        .catch(err => {
          Toast.fire({
            icon: 'error',
            title: 'Your order has been rejected because it has exceeded the amount of available stock of this product'
          })
          console.log(err)
        })
    },
    deleteCart (context, id) {
      axios({
        method: 'DELETE',
        url: '/carts/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          Toast.fire({
            icon: 'success',
            title: res.data.message
          })
          this.dispatch('fetchCart')
        })
        .catch(err => {
          Toast.fire({
            icon: 'error',
            title: err.message
          })
        })
    },
    fetchTransaction (context) {
      axios({
        method: 'GET',
        url: '/history',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          console.log(res.data)
          context.commit('fetchHistory', res.data)
        })
        .catch(err => {
          Toast.fire({
            icon: 'error',
            title: err.message
          })
        })
    }
  },
  modules: {
  }
})
