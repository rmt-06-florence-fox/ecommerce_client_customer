import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosInstance'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    productData: [],
    cartData: []
  },
  mutations: {
    getProductData (state, payload) {
      state.productData = payload
    },
    getCartData (state, payload) {
      console.log(payload, 'mutasi')
      state.cartData = payload
    }
  },
  actions: {
    fetchData (context) {
      axios
        .get('/product')
        .then(({ data }) => {
          context.commit('getProductData', data)
        })
        .catch(console.log)
    },
    login (context, payload) {
      axios({
        method: 'post',
        url: '/login',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('isLogin', true)
          router.push('/home')
        })
        .catch((err) => {
          console.log(err.msg, 'ini eror')
        })
    },
    register (context, payload) {
      console.log(payload)
      axios({
        method: 'post',
        url: '/register',
        data: payload
      })
        .then(({ data }) => {
          router.push('/login')
        })
        .catch((err) => {
          console.log(err.msg, 'ini eror')
        })
    },
    logout (context) {
      localStorage.removeItem('access_token')
      localStorage.setItem('isLogin', false)
      router.push('/login')
    },
    fetchCart (context) {
      const accessToken = localStorage.getItem('access_token')
      axios({
        url: 'cart',
        method: 'get',
        headers: {
          access_token: accessToken
        }
      })
        .then(({ data }) => {
          context.commit('getCartData', data)
        })
        .catch(err => {
          console.log(err, 'ini error')
        })
    },
    addToCart (context, payload) {
      console.log(payload, 'store')
      const accessToken = localStorage.getItem('access_token')
      const id = payload
      axios({
        url: `/cart/${id}`,
        method: 'post',
        headers: {
          access_token: accessToken
        }
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err, 'ini error')
        })
    },
    removeFromCart (context, payload) {
      const accessToken = localStorage.getItem('access_token')
      const id = payload
      axios({
        url: `/cart/${id}`,
        method: 'delete',
        headers: {
          access_token: accessToken
        }
      })
        .then(({ data }) => {
          console.log(data)
          context.dispatch('fetchCart')
        })
    },
    editQuantity (contex, payload) {
      console.log(payload)
      const id = payload.id
      const quantity = payload.quantity
      const accessToken = localStorage.getItem('access_token')
      axios({
        url: `/cart/${id}`,
        method: 'patch',
        headers: {
          access_token: accessToken
        },
        data: {
          quantity
        }
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err, 'ini error')
        })
    }
  },
  modules: {
  }
})
