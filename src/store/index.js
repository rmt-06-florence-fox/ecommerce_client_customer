import Vue from 'vue'
import Vuex from 'vuex'
// import router from '../router'
import axios from '../config/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    histories: [],
    errors: {
      red: '',
      green: '',
      yellow: '',
      blue: ''
    },
    isLogin: false,
    search: ''
  },
  mutations: {
    SET_products (state, payload) {
      state.products = payload
    },
    SET_carts (state, payload) {
      state.carts = payload
    },
    SET_histories (state, payload) {
      state.histories = payload
    },
    SET_errors (state, payload) {
      state.errors = payload
    },
    SET_isLogin (state, payload) {
      state.isLogin = payload
    },
    SET_search (state, payload) {
      state.search = payload
    }
  },
  actions: {
    login (context, payload) {
      axios({
        url: '/login2',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          router.push('/')
        })
        .catch(err => {
          context.commit('SET_errors', {
            red: err.response.data.message,
            green: '',
            yellow: '',
            blue: ''
          })
          setTimeout(() => {
            context.commit('SET_errors', {
              red: '',
              green: '',
              yellow: '',
              blue: ''
            })
          }, 3000)
        })
    },
    logout (context, payload) {
      localStorage.removeItem('access_token')
      context.commit('SET_isLogin', false)
      router.push('/')
    },
    register (context, payload) {
      axios({
        url: '/register',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          router.push('/login')
        })
        .catch(err => {
          context.commit('SET_errors', {
            red: err.response.data.message,
            green: '',
            yellow: '',
            blue: ''
          })
          setTimeout(() => {
            context.commit('SET_errors', {
              red: '',
              green: '',
              yellow: '',
              blue: ''
            })
          }, 3000)
        })
    },
    getProduct (context, payload) {
      axios({
        url: '/products',
        method: 'GET'
      })
        .then(({ data }) => {
          const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'IDR'
          })
          data.products.map(el => {
            el.price = formatter.format(el.price)
            return el
          })
          context.commit('SET_products', data.products)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getCart (context, payload) {
      axios({
        url: '/carts',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'IDR'
          })
          data.cart.map(el => {
            el.price = formatter.format(el.price)
            el.total = formatter.format(el.total)
            return el
          })
          context.commit('SET_carts', data.cart)
        })
        .catch(err => {
          console.log(err.response)
          router.push('/')
        })
    },
    getHistory (context, payload) {
      axios({
        url: '/carts/history',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'IDR'
          })
          data.histories.map(el => {
            el.price = formatter.format(el.price)
            el.total = formatter.format(el.total)
            return el
          })
          context.commit('SET_histories', data.histories)
        })
        .catch(err => {
          console.log(err.response)
          router.push('/')
        })
    },
    postCheckout (context, payload) {
      axios({
        url: '/carts/checkout',
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          router.push('/history')
        })
        .catch(err => {
          context.commit('SET_errors', {
            red: err.response.data.message,
            green: '',
            yellow: '',
            blue: ''
          })
          setTimeout(() => {
            context.commit('SET_errors', {
              red: '',
              green: '',
              yellow: '',
              blue: ''
            })
          }, 3000)
        })
    },
    postProductId (context, payload) {
      axios({
        url: `/carts/${payload}`,
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_errors', {
            red: '',
            green: '',
            yellow: '',
            blue: 'added to cart'
          })
          setTimeout(() => {
            context.commit('SET_errors', {
              red: '',
              green: '',
              yellow: '',
              blue: ''
            })
          }, 3000)
        })
        .catch(err => {
          context.commit('SET_errors', {
            red: err.response.data.message + '/ please login first',
            green: '',
            yellow: '',
            blue: ''
          })
          setTimeout(() => {
            context.commit('SET_errors', {
              red: '',
              green: '',
              yellow: '',
              blue: ''
            })
          }, 3000)
        })
    },
    patchCartId (context, payload) {
      axios({
        url: `/carts/${payload.id}`,
        method: 'PATCH',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          value: payload.value
        }
      })
        .then(({ data }) => {
          context.dispatch('getCart')
        })
        .catch(err => {
          context.commit('SET_errors', {
            red: err.response.data.message,
            green: '',
            yellow: '',
            blue: ''
          })
          setTimeout(() => {
            context.commit('SET_errors', {
              red: '',
              green: '',
              yellow: '',
              blue: ''
            })
          }, 3000)
        })
    },
    deleteCartId (context, payload) {
      axios({
        url: `/carts/${payload.id}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.dispatch('getCart')
        })
        .catch(err => {
          context.commit('SET_errors', {
            red: err.response.data.message,
            green: '',
            yellow: '',
            blue: ''
          })
          setTimeout(() => {
            context.commit('SET_errors', {
              red: '',
              green: '',
              yellow: '',
              blue: ''
            })
          }, 3000)
        })
    }
  },
  modules: {
  },
  getters: {
    filteredProduct: (state) => {
      if (state.search === '' || state.products.length < 1) {
        return state.products
      } else {
        const out = state.products.filter(el => {
          if (el.category.includes(state.search)) {
            return el
          }
        })
        return out
      }
    }
  }
})
