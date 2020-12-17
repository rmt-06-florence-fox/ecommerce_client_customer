import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosInstance.js'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errors: null,
    products: [],
    addToCartSuccess: null,
    addToCartFailed: null,
    carts: null,
    wishlist: null,
    addToWishlistSuccess: null,
    addToWishlistFailed: null,
    transactions: []
  },
  mutations: {
    set_errors (state, payload) {
      state.errors = payload
    },
    set_products (state, payload) {
      state.products = payload
    },
    set_addToCartSuccess (state, payload) {
      state.addToCartSuccess = payload
    },
    set_addToCartFailed (state, payload) {
      state.addToCartFailed = payload
    },
    set_carts (state, payload) {
      state.carts = payload
    },
    set_wishlist (state, payload) {
      state.wishlist = payload
    },
    set_addToWishlistFailed (state, payload) {
      state.addToWishlistFailed = payload
    },
    set_addToWishlistSuccess (state, payload) {
      state.addToWishlistSuccess = payload
    },
    set_transactions (state, payload) {
      state.transactions = payload
    }
  },
  actions: {
    login (context, payload) {
      axios({
        url: '/customer/login',
        method: 'post',
        data: payload
      })
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token)
          context.dispatch('fetchProducts')
          router.push('/customer')
        })
        .catch(err => {
          context.commit('set_errors', err.response.data)
          setTimeout(() => {
            context.commit('set_errors', null)
          }, 1500)
        })
    },
    register (context, payload) {
      axios({
        url: '/customer/register',
        method: 'post',
        data: payload
      })
        .then(response => {
          router.push('/login')
        })
        .catch(err => {
          context.commit('set_errors', err.response.data)
          setTimeout(() => {
            context.commit('set_errors', null)
          }, 1500)
        })
    },
    logout (context) {
      localStorage.clear()
      router.push('/')
    },
    fetchProducts (context) {
      axios({
        url: '/products',
        method: 'get'
      })
        .then(response => {
          context.commit('set_products', response.data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    addToCart (context, payload) {
      axios({
        url: `/customer/carts/${payload.id}`,
        method: 'post',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          context.commit('set_addToCartSuccess', 'Success add item to your cart!')
          setTimeout(() => {
            context.commit('set_addToCartSuccess', null)
          }, 1500)
        })
        .catch(err => {
          context.commit('set_addToCartFailed', err.response.data.message)
          setTimeout(() => {
            context.commit('set_addToCartFailed', null)
          }, 1500)
        })
    },
    getCart (context) {
      axios({
        url: '/customer/carts',
        method: 'get',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          context.commit('set_carts', response.data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    decreaseItem (context, payload) {
      if (payload.quantity > 1) {
        axios({
          url: `/customer/carts/${payload.ProductId}`,
          method: 'patch',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(response => {
            context.dispatch('getCart')
          })
          .catch(err => {
            console.log(err.response.data)
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
              url: `/customer/carts/${payload.ProductId}`,
              method: 'patch',
              headers: {
                access_token: localStorage.getItem('access_token')
              }
            })
              .then(response => {
                swalWithBootstrapButtons.fire(
                  'Deleted!',
                  'Your product has been deleted from cart.',
                  'success'
                )
                context.dispatch('getCart')
              })
          } else {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your product is safe :)',
              'error'
            )
          }
        }).catch(err => {
          console.log(err.response.data)
        })
      }
    },
    increaseItem (context, payload) {
      axios({
        url: `/customer/carts/${payload.ProductId}`,
        method: 'post',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          context.dispatch('getCart')
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    addToWishlist (context, payload) {
      axios({
        url: `/customer/wishlist/${payload.id}`,
        method: 'post',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          context.commit('set_addToWishlistSuccess', 'Success add item to your wishlist!')
          setTimeout(() => {
            context.commit('set_addToWishlistSuccess', null)
          }, 1500)
        })
        .catch(err => {
          context.commit('set_addToWishlistFailed', err.response.data.message)
          setTimeout(() => {
            context.commit('set_addToWishlistFailed', null)
          }, 1500)
        })
    },
    getWishlist (context) {
      axios({
        url: '/customer/wishlist',
        method: 'get',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          context.commit('set_wishlist', response.data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    checkout (context) {
      const swalWithBootstrapButtons = Vue.swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Checkout?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, checkout!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            url: '/customer/checkout',
            method: 'put',
            headers: {
              access_token: localStorage.getItem('access_token')
            },
            data: {
              carts: context.state.carts
            }
          })
            .then(response => {
              swalWithBootstrapButtons.fire(
                'Successfully Checkout!',
                'success'
              )
              context.dispatch('getCart')
            })
        } else {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your product is safe :)',
            'error'
          )
        }
      }).catch(err => {
        console.log(err.response.data)
      })
    },
    getTransactions (context) {
      axios({
        url: '/customer/transactions',
        method: 'get',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          context.commit('set_transactions', response.data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    deleteWishlist (context, payload) {
      const swalWithBootstrapButtons = Vue.swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Are you sure to remove this item from your wishlist?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            url: `/customer/wishlist/${payload.id}`,
            method: 'delete',
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
            .then(response => {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your product has been deleted from cart.',
                'success'
              )
              context.dispatch('getWishlist')
            })
        } else {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your product is safe :)',
            'error'
          )
        }
      }).catch(err => {
        console.log(err.response.data)
      })
    },
    deleteCart (context, payload) {
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
            url: `/customer/carts/${payload.ProductId}`,
            method: 'delete',
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
            .then(response => {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your product has been deleted from cart.',
                'success'
              )
              context.dispatch('getCart')
            })
        } else {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your product is safe :)',
            'error'
          )
        }
      }).catch(err => {
        console.log(err.response.data)
      })
    }
  },
  modules: {
  }
})
