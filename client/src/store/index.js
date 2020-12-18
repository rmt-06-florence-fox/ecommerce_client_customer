import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    isLogin: null
  },
  mutations: {
    SET_DATA_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_DATA_CARTS (state, payload) {
      state.carts = payload
    },
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    fetchProducts (context) {
      axios({
        url: 'http://localhost:3000/products',
        method: 'GET'
      })
        .then(res => {
          context.commit('SET_DATA_PRODUCTS', res.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    register (context, payload) {
      axios({
        url: 'http://localhost:3000/register',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(res => {
          Toast.fire({
            icon: 'success',
            title: 'Your account has been Registered'
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchCarts (context) {
      axios({
        url: 'http://localhost:3000/carts',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          context.commit('SET_DATA_CARTS', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart (context, payload) {
      axios({
        url: 'http://localhost:3000/carts',
        method: 'POST',
        data: {
          ProductId: payload
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Added to Cart'
          })
        })
        .catch(err => {
          console.log(err)
          if (localStorage.getItem('access_token')) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Out of stock'
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'You need to login first'
            })
          }
        })
    },
    updateCart (context, payload) {
      axios({
        url: 'http://localhost:3000/carts',
        method: 'PATCH',
        data: {
          cartId: payload.cartId,
          addOrRemove: payload.addOrRemove
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          if (payload.addOrRemove === 'add') {
            Toast.fire({
              icon: 'success',
              title: 'Success to add stock'
            })
          } else {
            Toast.fire({
              icon: 'success',
              title: 'Success to remove stock'
            })
          }
          context.dispatch('fetchCarts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeCart (context, payload) {
      axios({
        url: `http://localhost:3000/carts/${payload}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          Toast.fire({
            icon: 'success',
            title: 'Success to remove from cart'
          })
          context.dispatch('fetchCarts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    login (context, payload) {
      axios({
        url: 'http://localhost:3000/loginCustomer',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(res => {
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
          localStorage.setItem('access_token', res.data.access_token)
          context.dispatch('checkLogin')
          router.push('/')
        })
        .catch(err => {
          Toast.fire({
            icon: 'error',
            title: 'Invalid Email or Password'
          })
          console.log(err)
        })
    },
    checkLogin (context) {
      if (localStorage.getItem('access_token')) {
        context.commit('SET_ISLOGIN', true)
      } else {
        context.commit('SET_ISLOGIN', false)
      }
    }
  },
  modules: {
  }
})
