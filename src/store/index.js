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
    listTransactions: []
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
    }
  },
  actions: {
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
        .catch(e => console.log(e))
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
        .catch(e => console.log(e))
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
          console.log(data)
          context.commit('setListTransactions', data)
        })
        .catch(e => console.log(e))
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
          console.log(e)
        })
    },
    register (context, user) {
      axios
        .post('/register', user)
        .then(response => {
          router.push('/')
        })
        .catch(e => console.log(e))
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
    addCart (context, productId) {
      axios({
        url: `/carts/${productId}`,
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          ProductId: productId
        }
      })
        .then(response => {
          console.log(response + 'Successfully Added')
        })
        .catch(e => console.log(e))
    },
    patchCart (context, productId) {
      axios({
        url: `/carts/${productId}`,
        method: 'PATCH',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          console.log(response)
        })
        .catch(e => console.log(e))
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
        .catch(e => console.log(e))
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
        .catch(e => console.log(e))
    },
    deleteProduct (context) {
      axios({
        url: '/customerProduct',
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          console.log(response.message)
        })
        .catch(e => console.log(e))
    },
    addTransaction (context, data) {
      axios({
        url: `/transactions/${data.id}`,
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          quantity: data.quantity
        }
      })
        .then(response => {
          console.log(response)
        })
        .catch(e => console.log(e))
    }
  },
  modules: {
  }
})
