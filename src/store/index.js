import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/config/axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    products: [],
    carts: []
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setCarts (state, payload) {
      state.carts = payload
    }
  },
  actions: {
    fetchAllProducts (context) {
      return axios
        .get('customers')
        .then(({ data }) => {
          context.commit('setProducts', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchAllCarts (context) {
      const accessToken = localStorage.getItem('access_token')
      return axios
        .get('carts', {
          headers: {
            access_token: accessToken
          }
        })
        .then(({ data }) => {
          context.commit('setCarts', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart (context, payload) {
      const accessToken = localStorage.getItem('access_token')
      axios({
        url: 'carts/addCart',
        method: 'POST',
        data: {
          ProductId: payload.ProductId,
          quantity: payload.quantity
        },
        headers: {
          access_token: accessToken
        }
      })
        .then(({ data }) => {
          context.commit('setCarts', data)
          router.push({ name: 'Cart' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteCart (context, payload) {
      const accessToken = localStorage.getItem('access_token')
      axios({
        url: `carts/${payload.CartId}`,
        method: 'DELETE',
        headers: {
          access_token: accessToken
        },
        data: {
          ProductId: payload.ProductId
        }
      })
    },
    removeFromCart (context, payload) {
      const accessToken = localStorage.getItem('access_token')
      axios({
        url: `carts/items/${payload.CartId}`,
        method: 'DELETE',
        headers: {
          access_token: accessToken
        },
        data: {
          ProductId: payload.ProductId
        }
      })
    },
    checkout (context, payload) {
      const accessToken = localStorage.getItem('access_token')
      return axios({
        url: `carts/checkout/${payload.id}`,
        method: 'POST',
        headers: {
          access_token: accessToken
        }
      })
        .then(() => {
          router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    login(context, payload) {
      return axios({
        url: 'customers/login',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          const accessToken = data.access_token
          localStorage.setItem('access_token', accessToken)
          router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Oops...', 'Wrong email/password', 'error')
        })
    },
    register(context, payload) {
      return axios({
        url: 'customers/register',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          router.push({ name: 'Login' })
        })
        .catch(err => {
          Swal.fire('Oops...', `${err.response.data.error}`, 'error')
        })
    },
    logout (context) {
      localStorage.removeItem('access_token')
    }
  },
  modules: {
  }
})
