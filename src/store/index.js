import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosinstance'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: {},
    currentUser: localStorage.getItem('email')
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setCarts (state, payload) {
      state.carts = payload
    },
    setCurrentUser (state, payload) {
      state.currentUser = payload
    }
  },
  actions: {
    login (context, payload) {
      axios({
        url: '/customers/login',
        method: 'POST',
        data: { email: payload.email, password: payload.password }
      })
        .then((response) => {
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('email', response.data.email)
          router.push('/')
        })
        .catch((error) => {
          Swal.fire('Login Failed', `${error.response.data.message}`, 'error')
        })
    },
    register (context, payload) {
      axios({
        url: '/customers/register',
        method: 'POST',
        data: { email: payload.email, password: payload.password }
      })
        .then(response => {
          Swal.fire(
            'Register Success',
            'Account is registered!',
            'success'
          )
        })
        .catch(error => {
          Swal.fire('Register Failed',
            `${error.response.data.message}`,
            'error'
          )
        })
    },
    fetchProductList (context) {
      axios({
        url: '/products',
        method: 'GET'
      })
        .then((response) => {
          context.commit('setProducts', response.data.products)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addToCart (context, payload) {
      axios({
        url: '/carts',
        method: 'POST',
        data: payload,
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(response => {
          Swal.fire(
            'Done',
            'Product has been added to cart!',
            'success'
          )
          router.push('/carts')
        })
        .catch((error) => {
          Swal.fire('Failed', `${error.response.data.message}`, 'error')
        })
    },
    fetchCartList (context) {
      axios({
        url: '/carts',
        method: 'GET',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then((response) => {
          context.commit('setCarts', response.data)
        })
        .catch((error) => {
          console.log(error.response.data)
          console.log(error)
        })
    }
  },
  modules: {
  }
})
