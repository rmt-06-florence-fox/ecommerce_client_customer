import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios/axiosInstance'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: { cart: [], },
    wishlist: []
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
    register (context, payload) {
      axios({
        method: 'POST',
        url: '/registerCustomer',
        data: payload
      })
      .then(( data ) => {
        console.log(data.email)
        router.push({ name: 'Login' })
        Vue.swal(
          'Success!',
          'Please Login First!!!',
          'success'
        )
      })
      .catch(err => {
        console.log(err)
        Vue.swal(
          'Error!',
          err.response.data.msg,
          'error'
        )
      })
    },
    login (context, payload) {
      axios({
        method: 'POST',
        url: '/loginCustomer',
        data: payload
      })
      .then(( data ) => {
        localStorage.setItem('access_token', data.access_token)
        router.push({ name: 'Home' })
        Vue.swal(
          'Success!',
          'Welcome to TokoKita!!!',
          'success'
        )
      })
      .catch(err => {
        console.log(err)
        Vue.swal(
          'Error!',
          err.response.data.msg,
          'error'
        )
      })
    },
    fetchProducts (context) {
      axios({
        method: 'GET',
        url: '/productsCustomer',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(({ data }) => {
        console.log(data[0].name)
        context.commit('setProducts', data)
      })
      .catch(err => {
        console.log(err)
        Vue.swal(
          'Error!',
          err.response.data.msg,
          'error'
        )
      })
    },
    fetchCarts (context) {
      axios({
        method: 'GET',
        url: '/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(( data ) => {
        console.log(data)
        context.commit('setCarts', data)
      })
      .catch(err => {
        console.log(err)
        Vue.swal(
          'Error!',
          err.response.data.msg,
          'error'
        )
      })
    },
    addCart (context, payload) {
      console.log(context)
      axios({
        method: 'POST',
        url: `/carts`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          ProductId: payload
        }
      })
      .then(( data ) => {
        console.log(data)
        context.dispatch('fetchProducts')
        context.dispatch('fetchCarts')
            Vue.swal(
              'Success!',
              'Add Product to Cart!',
              'success'
            )
      })
      .catch(err => {
        console.log(err.response)
        Vue.swal(
          'Error!',
          err.response.data.msg,
          'error'
        )
      })
    },
    updateCart (context, payload) {
      axios({
        method: 'PATCH',
        url: `/carts/${payload.id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          quantity: payload.quantity
        }
      })
      .then((data) => {
        console.log(data)
        context.dispatch('fetchCarts')
      })
      .catch((err) => {
        console.log(err.response.data.msg)
        Vue.swal(
          'Error!',
          err.response.data.msg,
          'error'
        )
      })
    },
    deleteCart (context, payload) {
      axios({
        method: 'DELETE',
        url: `/carts/${payload.id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(( data ) => {
          console.log(data)
          context.dispatch('fetchProducts')
          Vue.swal(
            'Success!',
            'Delete Cart Success',
            'success'
          )
        })
        .catch(err => {
          console.log(err)
          Vue.swal(
            'Error!',
            err.response.data.msg,
            'error'
          )
        })
    },
  },
  modules: {
  }
})
