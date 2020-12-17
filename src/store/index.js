import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    categories: [],
    editData: null,
    carts: [],
    transactions: [],
    trans: null,
    totalPrice: 0,
    alert: false,
    errMessage: ''
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setCategories (state, payload) {
      state.categories = payload
    },
    setCarts (state, payload) {
      state.carts = payload
    },
    setTransactions (state, payload) {
      state.transactions = payload
    },
    setTrans (state, payload) {
      state.trans = payload
    },
    setTotalPrice (state, payload) {
      state.totalPrice = payload
    },
    changeAlert (state, condition) {
      state.alert = condition
    },
    errMessage (state, message) {
      state.errMessage = message
    }
  },
  actions: {
    register (context, payload) {
      axios({
        method: 'POST',
        url: '/register',
        data: payload
      })
        .then(({ data }) => {
          router.push({ name: 'Login' })
        })
        .catch((err) => {
          context.commit('changeAlert', true)
          if (err.response) {
            console.log(err.response.data)
            context.commit('errMessage', err.response.data)
          } else if (err.request) {
            console.log(err.request)
            context.commit('errMessage', err.request)
          } else {
            console.log(err.message)
            context.commit('errMessage', err.message)
          }
          context.dispatch('changeAlert')
        })
    },
    login (context, payload) {
      axios({
        method: 'POST',
        url: '/user/login',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('user', JSON.stringify(data.user))
          localStorage.setItem('access_token', data.access_token)
          router.push({ name: 'Home' })
        })
        .catch((err) => {
          context.commit('changeAlert', true)
          if (err.response) {
            console.log(err.response.data)
            context.commit('errMessage', err.response.data)
          } else if (err.request) {
            console.log(err.request)
            context.commit('errMessage', err.request)
          } else {
            console.log(err.message)
            context.commit('errMessage', err.message)
          }
          context.dispatch('changeAlert')
        })
    },
    logout () {
      localStorage.clear()
      router.go()
    },
    getProducts (context) {
      axios({
        method: 'GET',
        url: '/products'
      })
        .then(({ data }) => {
          context.commit('setProducts', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getCategories (context) {
      axios({
        method: 'GET',
        url: '/categories'
      })
        .then(({ data }) => {
          context.commit('setCategories', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    changeAlert (context) {
      setTimeout(() => {
        context.commit('changeAlert', false)
      }, 3000)
    },
    // CART
    addToCart (context, payload) {
      axios({
        method: 'POST',
        url: '/carts',
        data: payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log('Success added item to cart')
          context.dispatch('getCart')
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCart (context) {
      const id = JSON.parse(localStorage.getItem('user')).id

      axios({
        method: 'GET',
        url: `/carts/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setCarts', data.payload.Carts)
          context.commit('setTotalPrice', data.total)
        })
        .catch(err => {
          console.log(err)
        })
    },
    minusCart (context, id) {
      axios({
        method: 'PATCH',
        url: `/carts/minus/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.dispatch('getCart')
        })
        .catch(err => {
          console.log(err)
        })
    },
    plusCart (context, id) {
      axios({
        method: 'PATCH',
        url: `/carts/plus/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.dispatch('getCart')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteCart (context, id) {
      axios({
        method: 'DELETE',
        url: `/carts/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.dispatch('getCart')
        })
        .catch(err => {
          console.log(err)
        })
    },
    // Transaction
    doCheckout (context, payload) {
      const id = JSON.parse(localStorage.getItem('user')).id

      axios({
        method: 'POST',
        url: `/transaction/${id}`,
        data: payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.dispatch('getCart')
          router.push({ name: 'Payment', params: { id: data.codeTrans } })
        })
        .check(err => {
          console.log(err)
        })
    },
    getUserTransaction (context) {
      const id = JSON.parse(localStorage.getItem('user')).id

      axios({
        method: 'GET',
        url: `/transactions/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setTransactions', data)
        })
        .catch(({ err }) => {
          console.log(err)
        })
    },
    getOneTransaction (context, code) {
      axios({
        method: 'GET',
        url: `/transaction/${code}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setTrans', data)
        })
        .catch(({ err }) => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
