import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios/axios'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
Vue.use(VueSweetalert2)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: {
      email: localStorage.email
    },
    products: [],
    banners: [],
    categories: [],
    landscapeBanners: [],
    potraitBanners: [],
    cart: [],
    transHistory: []
  },
  mutations: {
    setUserData (state, payload) {
      state.userData = payload
    },
    setProducts (state, payload) {
      state.products = payload
    },
    setBanners (state, payload) {
      state.banners = payload
    },
    setCategories (state, payload) {
      state.categories = payload
    },
    setLandscape (state, payload) {
      state.landscapeBanners = payload
    },
    setPotrait (state, payload) {
      state.potraitBanners = payload
    },
    setCart (state, payload) {
      state.cart = payload
    },
    setTrans (state, payload) {
      state.transHistory = payload
    }
  },
  actions: {
    register (context, payload) {
      return axios.post('/registerCust', payload)
    },
    login (context, payload) {
      axios({
        method: 'POST',
        url: '/loginCust',
        data: payload
      })
        .then(({ data }) => {
          console.log(data)
          // Vue.swal('Login Success')
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('email', data.email)
          this.$store.dispatch('fetchCart')
          this.$route.push('/')
        })
        .catch(({ err }) => {
          // const message = response.data.message
          // console.log(response.data.message)
          if (err) {
            Vue.swal('Failed to Login', `${err.response.data.message}`, 'error')
          }
          // Vue.swal('Failed to Login', `${err.response.data.message}`, 'error')
        })
    },
    fetchAllProducts (context) {
      axios.get('/products', {
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          context.commit('setProducts', data)
        })
        .catch(err => console.log(err))
    },
    fetchAllBanners (context) {
      return axios.get('/banner', {
      })
    },
    fetchCategories (context) {
      axios.get('/category', {
      })
        .then(({ data }) => {
          data = data.filter(cat => cat.Products.length > 0)
          context.commit('setCategories', data)
        })
        .catch(err => console.log(err))
    },
    fetchProductById (context, payload) {
      return axios.get(`/products/${payload}`, {
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    fetchBannerById (context, payload) {
      return axios.get(`/banner/${payload}`, {
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    checkBannersOri ({ state, commit }) {
      if (!state.banners.length) return []
      const landscape = []
      const potrait = []
      for (const banner of state.banners) {
        const img = new Image()
        img.src = banner.image_url
        img.onload = () => {
          if (img.naturalWidth > img.naturalHeight) landscape.push(banner)
          else potrait.push(banner)
        }
      }
      commit('setLandscape', landscape)
      commit('setPotrait', potrait)
    },
    fetchCart (context) {
      const token = localStorage.getItem('access_token')
      axios({
        url: '/carts',
        method: 'GET',
        headers: {
          access_token: token
        }
      })
        .then(({ data }) => {
          console.log(data)
          if (data.length > 0) {
            const cart = data.filter(el => !el.status)
            const history = data.filter(el => el.status)
            context.commit('setCart', cart)
            context.commit('setTrans', history)
          }
        })
        .catch(({ response }) => {
          console.log(response.data)
        })
      // axios.get('/carts', {
      //   headers: {
      //     access_token: localStorage.access_token
      //   }
      // })
      //   .then(({ data }) => {
      //     console.log('difetct cart')
      //     console.log(data)
      //     if (data.Products.length > 0) {
      //       const cart = data.Products.filter(el => !el.Cart.status)
      //       const history = data.Products.filter(el => el.Cart.status)
      //       commit('setCart', cart)
      //       commit('setTrans', history)
      //     }
      //   })
      //   .catch(({ response }) => {
      //     console.log(response)
      //   })
    },
    addToCart (con, payload) {
      console.log(payload)
      return axios.post('/carts', payload, {
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    patchCart (con, payload) {
      return axios.patch(`/carts/${payload.ProductId}`, payload, {
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    deleteCart (con, payload) {
      return axios.delete(`/carts/${payload.ProductId}`, {
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(() => {
          this.fetchCart()
          this.$route.go('/')
          if (this.state.cart.length === 0) {
            this.$route.push('/')
          }
        })
        .catch(({ err }) => {
          if (err) {
            Vue.swal('Failed to delete', `${err.response.data.message}`, 'error')
          }
        })
    },
    checkoutCart (con) {
      return axios.patch('/carts/checkout', null, {
        headers: {
          access_token: localStorage.access_token
        }
      })
    }
  },
  modules: {
  },
  getters: {
    getCategoryById: (state) => (id) => {
      return state.categories.find(category => category.id === id)
    },
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === id)
    },
    getProductsByCategoryId: (state) => (id) => {
      if (!id) return state.products
      else return state.products.filter(product => product.CategoryId === +id)
    },
    getBannersByCategoryId: (state) => (id) => {
      if (!id) return state.banners
      else return state.banners.filter(banner => banner.CategoryId === +id)
    },
    checkCart: (state) => (id) => {
      let check = false
      state.cart.forEach(c => {
        if (id === c.id) check = true
      })
      return check
    },
    amountProd: (state) => (id) => {
      for (const c of state.cart) {
        if (c.id === id) return c.Cart.amount
      }
    },
    sortTrans: (state) => {
      if (state.transHistory.length === 0) return []
      return state.transHistory.sort((a, b) => new Date(b.Cart.updatedAt) - new Date(a.Cart.updatedAt))
    },
    formatPrice: () => (price) => {
      return new Intl.NumberFormat('id-ID',
        { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
      ).format(price)
    }
  }
})
