import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosinstance'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    category: null,
    categories: [],
    products: [],
    carts: [],
    total: 0,
    histories: [],
    searchKey: {},
    isAuthenticated: false
  },
  mutations: {
    SET_CATEGORY (state, payload) {
      state.category = payload
    },
    SET_CATEGORIES (state, payload) {
      state.categories = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    },
    SET_TOTAL (state, payload) {
      state.total = payload
    },
    SET_HISTORIES (state, payload) {
      state.histories = payload
    },
    SET_SEARCH_KEY (state, payload) {
      state.searchKey = payload
    },
    SET_IS_AUTHENTICATED (state, payload) {
      state.isAuthenticated = payload
    }
  },
  actions: {
    fetchCategories ({ commit }) {
      return axios
        .get('/categories', {
          headers: { access_token: localStorage.getItem('access_token') }
        })
        .then(({ data }) => {
          data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
          commit('SET_CATEGORIES', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchProducts ({ commit }) {
      return axios
        .get('/products', {
        })
        .then(({ data }) => {
          commit('SET_PRODUCTS', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchCarts ({ commit }) {
      return axios
        .get('/carts', { headers: { access_token: localStorage.getItem('access_token') } })
        .then(({ data }) => {
          let total = 0
          data.map((cart) => {
            if (cart.Product.stock > 0) {
              total += cart.quantity * cart.Product.price
            }
          })
          commit('SET_CARTS', data)
          commit('SET_TOTAL', total)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchHistories ({ commit }) {
      return axios
        .get('/histories', { headers: { access_token: localStorage.getItem('access_token') } })
        .then(({ data }) => {
          commit('SET_HISTORIES', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addCart (context, payload) {
      return axios
        .post(`/carts/${payload}`, {}, {
          headers: { access_token: localStorage.getItem('access_token') }
        })
    },
    updateQuantity (context, payload) {
      return axios
        .patch(`/carts/${payload.CartId}`, { quantity: payload.quantity }, {
          headers: { access_token: localStorage.getItem('access_token') }
        })
    },
    deleteCart (context, payload) {
      return axios
        .delete(`/carts/${payload}`, {
          headers: { access_token: localStorage.getItem('access_token') }
        })
    },
    deleteHistory (context, payload) {
      console.log(payload)
      return axios
        .delete(`/histories/${payload}`, {
          headers: { access_token: localStorage.getItem('access_token') }
        })
    },
    checkout (context, payload) {
      const results = []
      const promises = []
      for (let i = 0; i < context.state.carts.length; i++) {
        const ProductId = context.state.carts[i].Product.id
        const quantity = context.state.carts[i].quantity
        const CartId = context.state.carts[i].id
        const historyData = {
          name: context.state.carts[i].Product.name,
          image_url: context.state.carts[i].Product.image_url,
          price: context.state.carts[i].Product.price,
          quantity: context.state.carts[i].quantity
        }
        const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwODE3MDU3OX0.ZY60r3QOeoq_RaJxRs1j70upDOAgpjzQbRMvVoWGkVA'
        promises.push(
          axios
            .patch(`/products/${ProductId}`, { quantity }, { headers: { access_token: accessToken } })
            .then((response) => {
              results.push(response)
              return axios
                .post('/histories', historyData, { headers: { access_token: localStorage.getItem('access_token') } })
                .then((response) => {
                  results.push(response)
                  return axios
                    .delete(`/carts/${CartId}`, { headers: { access_token: localStorage.getItem('access_token') } })
                    .then((response) => {
                      results.push(response)
                    })
                })
            })
        )
      }
      return Promise.all(promises)
    }
  },
  getters: {
    filteredProducts: (state) => {
      if (state.searchKey.words && state.searchKey.by) {
        return state.products.filter((product) => {
          if (state.searchKey.by === 'name') {
            if (product.name.toLowerCase().includes(state.searchKey.words.toLowerCase())) {
              return product
            }
          } else if (state.searchKey.by === 'category') {
            return product.Category.name.includes(state.searchKey.words)
          }
        })
      } else {
        return state.products
      }
    }
  }
})
