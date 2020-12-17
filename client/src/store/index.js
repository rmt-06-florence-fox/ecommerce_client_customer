import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosInstance.js'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    loggedIn: false,
    carts: [],
    successAddCart: null,
    failedAddCart: null
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    loginCheck (state, payload) {
      state.loggedIn = payload
    },
    setCarts (state, payload) {
      state.carts = payload
    },
    setSuccessAddCart (state, payload) {
      state.successAddCart = payload
    },
    setFailedAddCart (state, payload) {
      state.failedAddCart = payload
    }
  },
  actions: {
    register (context, payload) {
      axios({
        method: 'POST',
        url: 'https://ecommerce-sandy.herokuapp.com/customer/register',
        // url: 'http://localhost:3000/customer/register',
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
        url: 'https://ecommerce-sandy.herokuapp.com/customer/login',
        // url: 'http://localhost:3000/customer/login',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          router.push('/customer')
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchProduct (context) {
      axios({
        method: 'GET',
        url: 'https://ecommerce-sandy.herokuapp.com/products',
        // url: 'http://localhost:3000/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setProducts', data)
        })
        .catch(err => console.log(err))
    },
    addCart (context, payload) {
      const swal = Vue.swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success'
        },
        buttonsStyling: false
      })
      axios({
        method: 'POST',
        url: `https://ecommerce-sandy.herokuapp.com/customer/carts/${payload.ProductId}`,
        // url: 'http://localhost:3000/customer/carts/' + payload.id,
        data: payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          swal.fire(
            'Added!',
            'Product success to add',
            'success'
          )
        })
        .catch(err => {
          swal.fire(
            'Hold on!',
            'Not enough stock',
            'success'
          )
          console.log(err)
        })
    },
    fetchCart (context) {
      axios({
        method: 'GET',
        url: 'https://ecommerce-sandy.herokuapp.com/customer/carts',
        // url: 'http://localhost:3000/customer/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setCarts', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addQuantity (context, payload) {
      const swal = Vue.swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success'
        },
        buttonsStyling: false
      })
      axios({
        method: 'POST',
        url: `https://ecommerce-sandy.herokuapp.com/customer/carts/${payload.ProductId}`,
        // url: 'http://localhost:3000/customer/carts/' + payload.ProductId,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          context.dispatch('fetchCart')
        })
        .catch(err => {
          swal.fire(
            'Hold on!',
            'Not enough stock',
            'success'
          )
          console.log(err)
        })
    },
    reduceQuantity (context, payload) {
      if (payload.quantity > 1) {
        axios({
          method: 'PATCH',
          url: `https://ecommerce-sandy.herokuapp.com/customer/carts/${payload.ProductId}`,
          // url: 'http://localhost:3000/customer/carts/' + payload.ProductId,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(response => {
            context.dispatch('fetchCart')
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        const swalWithBootstrapButtons = Vue.swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            axios({
              method: 'patch',
              url: `https://ecommerce-sandy.herokuapp.com/customer/carts/${payload.ProductId}`,
              // url: 'http://localhost:3000/customer/carts/' + payload.ProductId,
              headers: {
                access_token: localStorage.getItem('access_token')
              }
            })
              .then(response => {
                swalWithBootstrapButtons.fire(
                  'Deleted!',
                  'Product success to delete',
                  'success'
                )
                context.dispatch('fetchCart')
              })
          } else {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Product cancelled to delete',
              'error'
            )
          }
        }).catch(err => {
          console.log(err.response.data)
        })
      }
    },
    checkout (context) {
      axios({
        method: 'PATCH',
        url: 'https://ecommerce-sandy.herokuapp.com/customer/carts/checkout',
        // url: 'http://localhost:3000/customer/carts/checkout',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.dispatch('fetchCart')
        })
        .catch(err => console.log(err))
    }
  },
  modules: {
  }
})
