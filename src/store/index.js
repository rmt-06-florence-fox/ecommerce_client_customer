import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from '../config/axiosInstance'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listProducts: [],
    listCategories: [],
    listCarts: [],
    listTransactions: [],
    isLogin: '',
    setCategory: ''
  },
  mutations: {
    setListProducts (state, payload) {
      state.listProducts = payload
    },
    setListCategories (state, payload) {
      state.listCategories = payload
    },
    setListCarts (state, payload) {
      state.listCarts = payload
    },
    setListTransactions (state, payload) {
      state.listTransactions = payload
    },
    setIsLogin (state, payload) {
      state.isLogin = payload
    },
    setFilter (state, payload) {
      state.setCategory = payload
    }
  },
  actions: {
    statusLogin (context) {
      if (localStorage.getItem('access_token')) {
        const status = true
        context.commit('setIsLogin', status)
      } else {
        const status = false
        context.commit('setIsLogin', status)
      }
    },
    fetchProducts (context) {
      axios({
        url: '/products',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setListProducts', data)
        })
        .catch(e => Vue.$vToastify.error(`${e.response.data.message}`))
    },
    fetchCarts (context) {
      axios({
        url: '/carts',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setListCarts', data)
        })
        .catch(e => Vue.$vToastify.error(`${e.response.data.message}`))
    },
    fetchTransactions (context) {
      axios({
        url: '/transactions',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setListTransactions', data)
        })
        .catch(e => Vue.$vToastify.error(`${e.response.data.message}`))
    },
    fetchCategories (context) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/categories',
          method: 'GET',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(({ data }) => {
            context.commit('setListCategories', data.data)
            resolve(data.data)
          })
          .catch(e => reject(e))
      })
    },
    login (context, user) {
      axios
        .post('/login', user)
        .then(response => {
          const token = response.data.access_token
          localStorage.setItem('access_token', token)
          router.push('/')
        })
        .catch(e => {
          Vue.$vToastify.error(`${e.response.data.message}`)
        })
    },
    register (context, user) {
      axios
        .post('/register', user)
        .then(response => {
          router.push('/')
        })
        .catch(e => Vue.$vToastify.error(`${e.response.data.message}`))
    },
    filterId (context, id) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/products/${id}`,
          method: 'GET',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(({ data }) => {
            context.commit('setFilterId', data)
            resolve(data)
          })
          .catch(err => reject(err))
      })
    },
    addCart (context, product) {
      axios({
        url: `/carts/${product.id}`,
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: product
      })
        .then(response => {
          if (response.status === 200) {
            Vue.$vToastify.success('product has been updated in your cart')
          } else {
            Vue.$vToastify.success('product has been added in your cart')
          }
        })
        .catch(e => Vue.$vToastify.error(`${e.response.data.message}`))
    },
    patchCart (context, product) {
      axios({
        url: `/carts/${product.productId}`,
        method: 'PATCH',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: product
      })
        .then(response => {
          context.dispatch('fetchCarts')
        })
        .catch(e => Vue.$vToastify.error(`${e.response.data.message}`))
    },
    deleteId (context, id) {
      axios({
        url: `/carts/${id}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          context.dispatch('fetchCarts')
        })
        .catch(e => Vue.$vToastify.error(`${e.response.data.message}`))
    },
    deleteCart (context) {
      axios({
        url: '/carts',
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          router.push('/')
        })
        .catch(e => Vue.$vToastify.error(`${e.response.data.message}`))
    },
    patchStock (context, data) {
      axios({
        url: `/customerProduct/${data.id}`,
        method: 'PATCH',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          stock: data.stock
        }
      })
        .then(response => {
          console.log(response)
        })
        .catch(e => Vue.$vToastify.error(`${e.response.data.message}`))
    },
    transactionData (context) {
      axios({
        url: '/transactions',
        method: 'PATCH',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          router.push('/')
        })
        .catch(e => Vue.$vToastify.error(`${e.response.data.message}`))
    }
  },
  modules: {
  },
  getters: {
    countTotal: state => {
      let total = 0
      for (let i = 0; i < state.listCarts.length; i++) {
        total += (state.listCarts[i].quantity * state.listCarts[i].Product.price)
      }
      return total
    },
    getCategory (state) {
      if (state.setCategory === '') {
        return state.listProducts.data
      }
      return state.listProducts.data.filter(product => product.Categories[0].category === state.setCategory)
    }
  }
})
