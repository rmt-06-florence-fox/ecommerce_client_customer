import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    histories: [],
    categories: [],
    filteredBy: null
  },
  mutations: {
    fetchProduct (state, data) {
      state.products = data
    },
    fetchCart (state, data) {
      state.carts = data
    },
    fetchHistory (state, data) {
      state.histories = data
    },
    fetchCategory (state, data) {
      state.categories = data
    },
    filterCategory (state, id) {
      state.filteredBy = id
    }
  },
  actions: {
    fetchProduct (context) {
      axios({
        url: 'http://localhost:3000/product',
        method: 'GET'
      })
        .then(response => {
          context.commit('fetchProduct', response.data)
        })
        .catch(error => {
          console.log(error.response.data)
        })
    },
    addCart (context, payload) {
      return axios({
        url: 'http://localhost:3000/cart',
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          ProductId: payload.id,
          bought: payload.bought
        }
      })
    },
    signin (context, payload) {
      return axios({
        url: 'http://localhost:3000/signin',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    register (context, payload) {
      return axios({
        url: 'http://localhost:3000/register',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    fetchCart (context) {
      axios({
        url: 'http://localhost:3000/cart',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          context.commit('fetchCart', response.data)
        })
        .catch(error => {
          console.log(error.response.data)
        })
    },
    removeCart (context, id) {
      return axios({
        url: 'http://localhost:3000/cart/' + id,
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    checkout (context, payload) {
      const temp = []
      for (let i = 0; i < payload.length; i++) {
        temp.push(axios({
          url: 'http://localhost:3000/cart/' + payload[i].id,
          method: 'PUT',
          data: {
            bought: payload[i].bought,
            total_price: payload[i].total_invoice
          },
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        }))
      }
      return Promise.all(temp)
    },
    fetchHistory (context) {
      axios({
        url: 'http://localhost:3000/history',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].updatedAt = response.data[i].updatedAt.split('T')[0]
          }
          context.commit('fetchHistory', response.data)
        })
        .catch(error => {
          console.log(error.response.data)
        })
    },
    fetchCategory (context) {
      axios({
        url: 'http://localhost:3000/category',
        method: 'GET'
      })
        .then(response => {
          context.commit('fetchCategory', response.data)
        })
        .catch(error => {
          console.log(error.response.data)
        })
    }
  },
  getters: {
    filteredProduct (state) {
      if (state.filteredBy) {
        return state.products.filter(item => item.CategoryId === state.filteredBy)
      } else {
        return state.products
      }
    }
  },
  modules: {
  }
})
