import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios/axiosInstance'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userEmail: '',
    product: [],
    carts: [],
    loginBtn: ''
  },
  mutations: {
    setValueEmail (state, data) {
      state.userEmail = data
    },
    setValueProduct (state, data) {
      state.product = data
    },
    setCart (state, data) {
      state.carts = data
    },
    setBtnLogin (state) {
      if (localStorage.getItem('access_token')) {
        state.loginBtn = 'd-none btn-disable'
      } else {
        state.loginBtn = 'btn btn-outline-secondary d-inline'
      }
    }
  },
  actions: {
    registerUser (context, payload) {
      axios({
        url: '/register',
        method: 'post',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(result => {
          console.log(result.data)
          router.push('/login')
        })
        .catch(err => {
          console.log(err)
        })
    },
    loginUser (context, payload) {
      axios({
        url: '/login/customer',
        method: 'post',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(result => {
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Login success',
            showConfirmButton: false,
            timer: 1500
          })
          localStorage.setItem('access_token', result.data.access_token)
          console.log(result.data)
          router.push('/')
          context.commit('setValueEmail')
        })
        .catch(err => {
          if (err.response) {
            console.log('masuk response')
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(err.response.data, '<<< response boss')
            console.log(err.response.status, '<<< response boss')
            console.log(err.response.headers, '<<< response boss')
          } else if (err.request) {
            console.log('masuk request')
            // The request was made but no response was received
            // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(err.request, '<<<< request bos')
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err.message)
          }
          console.log(err.config)
        })
    },
    fetchProduct (context) {
      axios({
        url: '/customer/products',
        method: 'get'
      })
        .then(({ data }) => {
          context.commit('setValueProduct', data)
        })
        .catch(err => {
          if (err.response) {
            console.log('masuk response')
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(err.response.data, '<<< response boss')
            console.log(err.response.status, '<<< response boss')
            console.log(err.response.headers, '<<< response boss')
          } else if (err.request) {
            console.log('masuk request')
            // The request was made but no response was received
            // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(err.request, '<<<< request bos')
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err.message)
          }
          console.log(err.config)
        })
    },
    addCart (context, id) {
      axios({
        url: '/carts',
        method: 'post',
        data: {
          ProductId: id
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchCart (context) {
      axios({
        url: '/carts',
        method: 'get',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('setCart', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    incrementQuantity (context, payload) {
      axios({
        url: '/carts/' + payload.id,
        method: 'put',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          quantity: payload.quantity += 1
        }
      })
        .then(({ data }) => {
          Swal.fire('Success')
          context.dispatch('fetchCart')
        })
        .catch(err => {
          console.log(err)
        })
    },
    decrementQuantity (context, payload) {
      axios({
        url: '/carts/' + payload.id,
        method: 'put',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          quantity: payload.quantity -= 1
        }
      })
        .then(({ data }) => {
          Swal.fire('Success')
          context.dispatch('fetchCart')
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response)
          }
        })
    },
    removeCart (context, id) {
      axios({
        url: '/carts/' + id,
        method: 'delete',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(_ => {
          Swal.fire('Success Delete')
          context.dispatch('fetchCart')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
