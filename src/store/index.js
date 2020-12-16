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
    successMessage: '',
    carts: [],
    banners: [],
    filter: ''
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
    },
    setFilter (state, string) {
      state.filter = string
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
    login (context, payload) {
      axios({
        method: 'POST',
        url: '/login',
        data: payload
      }).then(({ data }) => {
        // console.log('masuk then')
        if (data.role === 'admin') {
          // console.log('masuk error')
          throw new Error('you are not customer, you should not login through this app')
        } else if (data.role === 'customer') {
          // context.commit('setErrors', [])
          // console.log('masuk tidak error')
          localStorage.setItem('access_token', data.access_token)
          setTimeout(() => {
            context.dispatch('fetchProducts')
            context.dispatch('fetchMyCarts')
            context.dispatch('fetchBanners')
            router.push('/')
          }, 500)
        }
      }).catch(err => {
        // console.log(err)
        // console.log(typeof err)
        if (err.response) {
          // console.log('masuk if')
          context.commit('setErrors', err.response.data.messages)
        } else {
          // console.log('masuk else')
          context.commit('setErrors', [err.message])
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
    },
    async fetchBanners (context) {
      try {
        const { data } = await axios({
          url: '/banners',
          method: 'GET',
          headers: { access_token: localStorage.getItem('access_token') }
        })
        context.commit('setBanners', data)
      } catch (err) {
        context.commit('setErrors', err.response.data.messages)
      }
    }
  },
  getters: {
    categories (state) {
      const products = state.products
      const categories = []
      products.forEach(p => {
        if (!categories.includes(p.category)) {
          categories.push(p.category)
        }
      })
      return categories
    },
    getProductsBasedOnCategory: (state) => (category) => {
      const products = state.products
      return products.filter(p => {
        if (p.category === category) {
          return p
        }
      })
    }
  },
  modules: {
  }
})
