import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from '../config/axiosinstance'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    charts: [],
    chart: {}
  },
  mutations: {
    gelAllProducts (state, payload) {
      state.products = payload
    },
    getAllCharts (state, payload) {
      state.charts = payload
    },
    addToChart (state, payload) {
      state.chart = payload
    }
  },
  actions: {
    gelAllProducts (context) {
      axios({
        url: 'product',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          context.commit('gelAllProducts', response.data)
          // console.log(response.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getAllCharts (context) {
      axios({
        url: 'charts',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          // console.log(data)
          context.commit('getAllCharts', data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    addToChart (context, id) {
      axios({
        url: 'charts/' + id,
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('addToChart', data)
        })
        .catch(err => {
          router.push('/login')
          console.log(err.response)
        })
    },
    plusChart (context, id) {
      axios({
        url: 'increment/' + id,
        method: 'PATCH',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.dispatch('getAllCharts')
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    minusChart (context, id) {
      axios({
        url: 'decrement/' + id,
        method: 'PATCH',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          if (data.quantity <= 0) {
            this.dispatch('removeChart', data.id)
            console.log('berhasil dihapus')
          } else {
            this.dispatch('getAllCharts')
            console.log(data)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeChart (context, id) {
      axios({
        url: 'charts/' + id,
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.dispatch('getAllCharts')
          console.log(data)
        })
        .err(err => {
          console.log(err.response.data)
        })
    }
  },
  modules: {
  }
})
