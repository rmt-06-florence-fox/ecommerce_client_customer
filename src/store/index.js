import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from '../config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errors: [],
    products: [],
    product: {},
    banners: [],
    successMessage: '',
    carts: []
  },
  mutations: {
    setProducts (state, array) {
      state.products = array
    },
    setBanners (state, array) {
      state.banners = array
    },
    setErrors (state, array) {
      state.errors = array
    },
    setSuccess (state, string) {
      state.successMessage = string
      setTimeout(_ => {
        state.successMessage = ''
      }, 1300)
    },
    setCarts (state, array) {
      state.carts = array
    }
  },
  actions: {
    fetchProducts (context) {
      axios({
        url: '/products',
        method: 'GET',
        headers: { access_token: localStorage.getItem('access_token') }
      }).then(({ data }) => {
        context.commit('setProducts', data)
        // context.commit('setErrors', [])
      }).catch(err => {
        // console.log(err, '<<<< error from fetch Prods')
        context.commit('setErrors', err.response.data.messages)
      })
    },
    fetchBanners (context) {
      axios({
        url: '/banners',
        method: 'GET',
        headers: { access_token: localStorage.getItem('access_token') }
      }).then(({ data }) => {
        context.commit('setBanners', data)
        // context.commit('setErrors', [])
      }).catch(err => {
        // console.log(err, '<<<< error from fetch Prods')
        context.commit('setErrors', err.response.data.messages)
      })
    },
    login (context, payload) {
      axios({
        method: 'POST',
        url: '/login',
        data: payload,
        validateStatus: () => status < 500
      }).then(({ data }) => {
        if (data.role === 'admin') {
          // console.log('masuk error')
          throw new Error('you are not customer, you should not login through this app')
        } else {
          // context.commit('setErrors', [])
          // console.log('masuk tidak error')
          localStorage.setItem('access_token', data.access_token)
          setTimeout(() => {
            context.dispatch('fetchProducts')
            context.dispatch('fetchMyCarts')
            router.push('/')
          }, 500)
        }
      }).catch(err => {
        // console.log(err.message)
        // console.log(err.response.data, 'res.data')
        // console.log(err.response.status, 'res.status')
        // console.log(err.response.headers, 'res.headers')
        // console.log(err.request, 'req')
        // console.log('Error', err.message, 'config')
        // console.log(err.config, 'config')
        if (err.message) {
          console.log(typeof err)
          context.commit('setErrors', [err.message])
        } else {
          context.commit('setErrors', err.response.data.messages)
        }
      })
    },
    register (context, payload) {
      const { email, password } = payload
      axios({
        method: 'POST',
        url: '/register',
        data: payload
      }).then(({ data }) => {
        if (data) {
          context.commit('setSuccess', 'Registration has been done successfully')
          this.dispatch('login', { email, password })
        } else {
          this.commit('setErrors', ['failed to register'])
        }
      }).catch(err => {
        context.commit('setErrors', err.response.data.messages)
      })
    },
    async addCart (context, ProductId) {
      try {
        await axios({
          url: '/carts',
          method: 'POST',
          data: { ProductId },
          headers: { access_token: localStorage.getItem('access_token') }
        })
        context.dispatch('fetchMyCarts')
      } catch (err) {
        context.commit('setErrors', err.response.data.messages)
      }
    },
    async fetchMyCarts (context) {
      try {
        const { data } = await axios({
          url: '/carts',
          method: 'GET',
          headers: { access_token: localStorage.getItem('access_token') }
        })
        context.commit('setCarts', data)
      } catch (err) {
        context.commit('setErrors', err.response.data.messages)
      }
    },
    async alterQuantity (context, payload) {
      const { quantity, id } = payload
      try {
        await axios({
          url: '/carts/' + id,
          method: 'PATCH',
          data: { quantity },
          headers: { access_token: localStorage.getItem('access_token') }
        })
        context.dispatch('fetchMyCarts')
      } catch (err) {
        context.commit('setErrors', err.response.data.messages)
      }
    },
    async deleteCart (context, id) {
      try {
        const { data } = axios({
          url: '/carts/' + id,
          method: 'DELETE',
          headers: { access_token: localStorage.getItem('access_token') }
        })
        context.dispatch('fetchMyCarts')
        setTimeout(() => {
          context.commit('setSuccess', data.message)
        }, 450)
      } catch (err) {
        context.commit('setErrors', err.response.data.messages)
      }
    }
  },
  modules: {
  }
})
