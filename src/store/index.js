import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosInstance'
import Swal from 'sweetalert2'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    isActive: false,
    targetEdit: {},
    searchQuery: '',
    carts: [],
    isLoggedIn: localStorage.getItem('access_token'),
    isLoadingSearch: false,
    total: 0,
    allCarts: []
  },
  mutations: {
    changeProducts (state, payload) {
      state.products = payload
    },
    changeIsActive (state) {
      if (state.isActive) {
        state.isActive = false
      } else {
        state.isActive = true
      }
    },
    fillTargetEdit (state, payload) {
      state.targetEdit = payload
    },
    changeIsLoading (state) {
      console.log('ganti state laoding')
      state.isLoadingSearch = true
    },
    deactivate (state) {
      state.isLoading = false
    },
    changeCarts (state, payload) {
      state.carts = payload
    },
    changeAllCarts (state, payload) {
      state.allCarts = payload
    },
    changeLogin (state) {
      state.isLoggedIn = localStorage.getItem('access_token')
    },
    changeTotal (state) {
      let total = 0
      state.carts.forEach(item => {
        total += item.totalPrice
      })
      state.total = total
    }
  },
  actions: {
    login (context, payload) {
      return axios
        .post('/login', {
          email: payload.email,
          password: payload.password
        })
    },
    register (context, payload) {
      return axios
        .post('/register', {
          email: payload.email,
          password: payload.password
        })
    },
    fetchProducts (context) {
      console.log('fetching')
      axios
        .get('/products', {
          headers: { access_token: localStorage.getItem('access_token') }
        })
        .then(response => {
          context.commit('changeProducts', response.data.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    destroy (context, id) {
      axios({
        method: 'DELETE',
        url: '/products/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Delete Success',
            showConfirmButton: false,
            timer: 1000
          })

          setTimeout(function () {
            context.dispatch('fetchProducts')
          }, 1000)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
        })
    },
    fetchProductsById (context, id) {
      axios({
        method: 'GET',
        url: '/products/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          console.log(response.data.data)
          context.commit('fillTargetEdit', response.data.data)
          context.commit('changeIsActive')
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    addProduct (context, payload) {
      console.log(payload, 'payload add')
      return axios
        .post('/products', {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock
        },
        {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
    },
    postEdit (context) {
      axios({
        method: 'PUT',
        url: '/products/' + context.state.targetEdit.id,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: context.state.targetEdit
      })
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Edit Product Success',
            showConfirmButton: false,
            timer: 1000
          })

          setTimeout(function () {
            context.commit('changeIsActive')
          }, 1000)
          context.dispatch('fetchProducts')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
        })
    },
    fetchCarts (context) {
      console.log('fetchCarts')
      axios({
        method: 'GET',
        url: '/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          console.log('success')
          context.commit('changeCarts', response.data.data)
          context.commit('changeTotal')
          console.log(context.state.carts)
          console.log(context.state.total)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addCart (context, payload) {
      return axios({
        method: 'POST',
        url: '/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: payload
      })
    },
    decrementCart (context, payload) {
      return axios({
        method: 'PATCH',
        url: '/carts/' + payload.id,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: payload
      })
    },
    destroyCart (context, payload) {
      return axios({
        method: 'DELETE',
        url: '/carts/' + payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: payload
      })
    },
    checkout () {
      return axios({
        method: 'DELETE',
        url: '/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    fetchAllCart (context, payload) {
      return axios({
        method: 'GET',
        url: '/carts/' + payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    }
  },
  getters: {
    filtered: (state) => (val) => {
      return state.products.filter(product => {
        state.isLoadingSearch = false
        return product.name.toLowerCase().includes(val.toLowerCase())
      })
    }
  },
  modules: {
  }
})
