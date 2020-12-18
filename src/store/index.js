import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataItems: [],
    dataCategory: [],
    dataCart: []
  },
  mutations: {
    getProducts (state, payload) {
      state.dataItems = payload
    },
    getCategory (state, payload) {
      state.dataCategory = payload
    },
    getDataCart (state, payload) {
      state.dataCart = payload
    }
  },
  actions: {
    registerCustomer ({ commit }, payload) {
      return axios({
        method: 'post',
        url: 'https://bukapalak.herokuapp.com/register/customer',
        data: payload
      })
    },

    login ({ commit }, payload) {
      console.log(payload)
      return axios({
        method: 'post',
        url: 'https://bukapalak.herokuapp.com/login/customer',
        data: payload
      })
    },

    fetchData ({ commit }) {
      axios({
        method: 'get',
        url: 'https://bukapalak.herokuapp.com/products'
      })
        .then(({ data }) => {
          console.log(data)
          commit('getProducts', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    fetchCategory ({ commit }) {
      axios({
        method: 'get',
        url: 'https://bukapalak.herokuapp.com/categorie'
      })
        .then(({ data }) => {
          commit('getCategory', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    fetchDataCart ({ commit }) {
      axios({
        method: 'get',
        url: 'https://bukapalak.herokuapp.com/userproduct',
        headers: {
          acces_token: localStorage.acces_token
        }
      })
        .then(data => {
          commit('getDataCart', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    addDataCart ({ commit }, payload) {
      return axios({
        method: 'post',
        url: 'https://bukapalak.herokuapp.com/userproduct/' + payload.ProductId,
        headers: {
          acces_token: localStorage.acces_token
        },
        data: payload
      })
    },

    decrementDataCart ({ commit }, id) {
      return axios({
        method: 'patch',
        url: 'https://bukapalak.herokuapp.com/userproduct/decrement/' + id,
        headers: {
          acces_token: localStorage.acces_token
        }
      })
    },

    incrementDataCart ({ commit }, id) {
      return axios({
        method: 'patch',
        url: 'https://bukapalak.herokuapp.com/userproduct/increment/' + id,
        headers: {
          acces_token: localStorage.acces_token
        }
      })
    },

    deleteDataCart ({ commit }, id) {
      console.log('000000-0')
      return axios({
        method: 'delete',
        url: 'https://bukapalak.herokuapp.com/userproduct/' + id,
        headers: {
          acces_token: localStorage.acces_token
        }
      })
    }
  },
  modules: {
  }
})
