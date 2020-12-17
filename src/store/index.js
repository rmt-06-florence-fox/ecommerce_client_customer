import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosInstance'
import Swal from 'sweetalert2'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginStatus: '',
    products: [],
    categories: [],
    banners: [],
    carts: [],
    transactionHistory: [],
    wishlists: []
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setCategories (state, payload) {
      state.categories = payload
    },
    setBanner (state, payload) {
      state.banners = payload
    },
    setCart (state, payload) {
      state.carts = payload
    },
    setTransactionHistory (state, payload) {
      state.transactionHistory = payload
    },
    setWishlist (state, payload) {
      state.wishlists = payload
    },
    setLoginStatusOn (state, payload) {
      state.loginStatus = true
    },
    setLoginStatusOff (state, payload) {
      state.loginStatus = false
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
    fetchProduct (context) {
      axios({
        url: '/products',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(res => {
          context.commit('setProducts', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProduct (context, payload) {
      axios({
        url: '/products',
        method: 'POST',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock,
          categoryName: payload.categoryName
        }
      })
        .then(res => {
          Swal.fire(' Add Product Success')
          this.dispatch('fetchProduct')
        })
        .catch(err => {
          Swal.fire(' Add Product Failed')
          console.log(err)
        })
    },
    fetchCategory (context) {
      axios({
        url: '/category',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(res => {
          context.commit('setCategories', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    increaseQuantity (context, payload) {
      axios({
        url: `/cart/${payload.id}`,
        method: 'PATCH',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          quantity: payload.quantity
        }
      })
        .then(res => {
          context.dispatch('fetchCart')
          Swal.fire('Updated quantity Success')
        })
        .catch(err => {
          console.log(err)
          context.dispatch('fetchCart')
          Swal.fire('Stock Not Available')
        })
    },
    decreseQuantity (context, payload) {
      axios({
        url: `/cart/${payload.id}`,
        method: 'PATCH',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          quantity: payload.quantity
        }
      })
        .then(res => {
          context.dispatch('fetchCart')
          Swal.fire('Updated Quantity Success')
        })
        .catch(err => {
          context.dispatch('fetchCart')
          Swal.fire('Update Quantity Failed')
          console.log(err)
        })
    },
    fetchBanner (context) {
      axios({
        url: '/banner',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(res => {
          context.commit('setBanner', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    register (context, payload) {
      axios({
        url: '/register',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(res => {
          Swal.fire(' Register Success')
          console.log(res.data)
          router.push('/login')
        })
        .catch(err => {
          Swal.fire(err.request.response)
          console.log(err)
        })
    },
    customerLogin (context, payload) {
      axios({
        url: '/customerLogin',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(res => {
          Swal.fire('Welcome Back')
          context.commit('setLoginStatusOn')
          localStorage.setItem('access_token', res.data.access_token)
          router.push('/')
        })
        .catch(err => {
          console.log(err.request.response)
          Swal.fire(err.request.response)
        })
    },
    fetchCart (context) {
      axios({
        url: '/cart',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(res => {
          context.commit('setCart', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProductToCart (context, payload) {
      axios({
        url: '/cart',
        method: 'POST',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          ProductId: payload
        }
      })
        .then(res => {
          Swal.fire('add product success')
          context.commit('setCart', res.data)
        })
        .catch(err => {
          Swal.fire(err.request.response)
        })
    },
    removeCart (context, payload) {
      axios({
        url: `/cart/${payload}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(res => {
          Swal.fire('Remove Cart Success')
          context.dispatch('fetchCart')
        })
        .catch(err => {
          Swal.fire(err.request.response)
          context.dispatch('fetchCart')
          console.log(err)
        })
    },
    checkout (context, payload) {
      axios({
        url: '/cart/checkout',
        method: 'POST',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          cartData: payload
        }
      })
        .then(res => {
          console.log(res)
          Swal.fire('Checkout Success')
          context.dispatch('fetchCart')
        })
        .catch(err => {
          console.log(err)
          context.dispatch('fetchCart')
        })
    },
    fetchTransactionHistory (context) {
      axios({
        url: '/cart/transaction',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(res => {
          console.log(res)
          context.commit('setTransactionHistory', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    like (context, payload) {
      axios({
        url: '/wishlist',
        method: 'POST',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          ProductId: payload
        }
      })
        .then(res => {
          console.log(res)
          Swal.fire('you like this product')
        })
        .catch(err => {
          console.log(err)
          Swal.fire(err.request.response)
        })
    },
    fetchWishlist (context, payload) {
      axios({
        url: '/wishlist',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(res => {
          console.log(res.data)
          context.commit('setWishlist', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    unlike (context, id) {
      axios({
        url: `/wishlist/${id}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(res => {
          Swal.fire('you remove this product fron wishlist')
          context.dispatch('fetchWishlist')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  },
  getters: {
    filteredProduct: (state) => (name) => {
      return state.products.filter(product => {
        if (!name || name === 'all') {
          return product
        } else {
          return product.Category.name === name
        }
      })
    }
  }
})
