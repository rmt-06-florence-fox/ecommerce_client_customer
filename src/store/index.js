import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosInstance'
import Swal from 'sweetalert2'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    banners: [],
    carts: [],
    histories: [],
    wishlists: [],
    authenticated: localStorage.getItem('access_token')
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setBanners (state, payload) {
      state.banners = payload
    },
    setCarts (state, payload) {
      state.carts = payload
    },
    setQuantity (state, payload) {
      state.quantity = payload
    },
    setWishlists (state, payload) {
      state.wishlists = payload
    },
    setHistories (state, payload) {
      state.histories = payload
    },
    setAuthenticated (state, payload) {
      state.authenticated = payload
    }
  },
  actions: {
    fetchProducts (context) {
      axios({
        method: 'get',
        url: '/products'
      })
        .then(({ data }) => {
          context.commit('setProducts', data.products)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Show Products Failed!',
            text: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    fetchBanners (context) {
      axios({
        method: 'get',
        url: '/banners'
      })
        .then(({ data }) => {
          context.commit('setBanners', data.banners)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Show Banners Failed!',
            text: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    addOrUpdateCart (context, payload) {
      axios({
        method: 'put',
        url: '/cart/' + payload.id,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          quantity: payload.quantity
        }
      })
        .then(({ data }) => {
          if (data.message === 'Product Deleted Successfuly') {
            Swal.fire({
              icon: 'success',
              title: 'Delete Cart Success!',
              text: data.message,
              showConfirmButton: false,
              timer: 1500
            })
          } else if (router.history.current.name === 'Home') {
            Swal.fire({
              icon: 'success',
              title: 'Add to Cart Success!',
              showConfirmButton: false,
              timer: 1500
            })
          }
          context.dispatch('fetchCarts')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Add to Cart Failed!',
            text: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    fetchCarts (context) {
      axios({
        method: 'get',
        url: '/cart',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setCarts', data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Show Carts Failed!',
            text: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    checkoutCart (context) {
      axios({
        method: 'patch',
        url: '/cart',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Checkout Success!',
            showConfirmButton: false,
            timer: 1500
          })
          context.dispatch('fetchCarts')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Checkout Failed!',
            text: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    delCart (context, id) {
      axios({
        method: 'delete',
        url: '/cart/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Delete Cart Success!',
            text: data.message,
            showConfirmButton: false,
            timer: 1500
          })
          context.dispatch('fetchCarts')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Delete Carts Failed!',
            text: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    fetchHistories (context) {
      axios({
        method: 'get',
        url: '/history',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setHistories', data.history)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Show Histories Failed!',
            text: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    fetchWishlists (context) {
      axios({
        method: 'get',
        url: '/wishlist',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setWishlists', data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Show Wishlists Failed!',
            text: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    addWishlist (context, payload) {
      axios({
        method: 'post',
        url: '/wishlist/' + payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Add to Wishlist Success!',
            text: data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Add to Wishlist Failed!',
            text: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    delWishlist (context, id) {
      axios({
        method: 'delete',
        url: '/wishlist/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Delete Wishlist Success!',
            text: data.message,
            showConfirmButton: false,
            timer: 1500
          })
          context.dispatch('fetchWishlists')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Delete Wishlists Failed!',
            text: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    register (context, payload) {
      axios({
        method: 'post',
        url: '/register',
        data: payload
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Register Success!',
            showConfirmButton: false,
            timer: 1500
          })
          router.push('/login')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Register Failed!',
            text: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    login (context, payload) {
      axios({
        method: 'post',
        url: '/login',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          Swal.fire({
            icon: 'success',
            title: 'Login Success!',
            showConfirmButton: false,
            timer: 1500
          })
          context.commit('setAuthenticated', data.access_token)
          router.push('/')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed!',
            text: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    }
  },
  getters: {
  },
  modules: {
  }
})
