import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    productById: '',
    categories: [],
    banners: [],
    profile: '',
    cart: '',
    history: [],
    wishlists: []
  },
  mutations: {
    GETUSER (state, payload) {
      state.profile = payload
    },
    GETPRODUCTS (state, payload) {
      state.products = payload
    },
    GETPRODUCTBYID (state, payload) {
      state.productById = payload
    },
    GETCATEGORIES (state, payload) {
      state.categories = payload
    },
    GETBANNERS (state, payload) {
      state.banners = payload
    },
    GETCART (state, payload) {
      state.cart = payload
    },
    GETHISTORY (state, payload) {
      state.history = payload
    },
    GETWISHLISTS (state, payload) {
      state.wishlists = payload
    }
  },
  actions: {
    GETPRODUCTS (context) {
      axios({
        method: 'get',
        url: '/products'
      }).then(({ data }) => {
        context.commit('GETPRODUCTS', data)
      }).catch(err => {
        console.log(err)
      })
    },
    GETPRODUCTBYID (context, payload) {
      axios({
        method: 'get',
        url: '/products/' + payload.id
      }).then(({ data }) => {
        context.commit('GETPRODUCTBYID', data)
      }).catch(err => {
        console.log(err)
      })
    },
    GETCATEGORIES (context) {
      axios({
        method: 'get',
        url: '/categories'
      }).then(({ data }) => {
        context.commit('GETCATEGORIES', data)
      }).catch(err => {
        console.log(err)
      })
    },
    GETBANNERS (context) {
      axios({
        method: 'get',
        url: '/banners'
      }).then(({ data }) => {
        context.commit('GETBANNERS', data)
      }).catch(err => {
        console.log(err)
      })
    },
    GETUSER (context) {
      axios({
        method: 'get',
        url: '/user',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(({ data }) => {
        context.commit('GETUSER', data)
      }).catch(err => {
        console.log(err)
      })
    },
    GETCART (context) {
      axios({
        method: 'get',
        url: '/transaction',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(({ data }) => {
        context.commit('GETCART', data)
      }).catch(err => {
        console.log(err)
      })
    },
    GETHISTORY (context) {
      axios({
        method: 'get',
        url: '/history',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(({ data }) => {
        context.commit('GETHISTORY', data)
      }).catch(err => {
        console.log(err)
      })
    },
    GETWISHLISTS (context) {
      axios({
        method: 'get',
        url: '/wishlists',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(({ data }) => {
        context.commit('GETWISHLISTS', data)
      }).catch(err => {
        console.log(err)
      })
    },
    CHECKOUT (context, payload) {
      const id = payload.id
      axios({
        method: 'put',
        url: '/transaction/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(({ data }) => {
        context.dispatch('GETCART')
        context.dispatch('GETHISTORY')
      }).catch(err => {
        console.log(err)
      })
    },
    CLEARCART (context, payload) {
      const id = payload.id
      axios({
        method: 'delete',
        url: '/transaction/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(({ data }) => {
        context.dispatch('GETCART')
      }).catch(err => {
        console.log(err)
      })
    },
    ADDTOCART (context, payload) {
      const ProductId = payload.ProductId
      axios({
        method: 'post',
        url: '/cart/' + ProductId,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(({ data }) => {
        context.dispatch('GETCART')
      }).catch(err => {
        console.log(err)
      })
    },
    EDITCART (context, payload) {
      const id = payload.id
      const quantity = payload.quantity
      axios({
        method: 'put',
        url: '/cart/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          quantity
        }
      }).then(({ data }) => {
        context.dispatch('GETCART')
      }).catch(err => {
        console.log(err)
      })
    },
    DELETECART (context, payload) {
      const id = payload.id
      axios({
        method: 'put',
        url: '/cart/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(({ data }) => {
        context.dispatch('GETCART')
      }).catch(err => {
        console.log(err)
      })
    },
    DELETEWISHLISTS (context, payload) {
      const id = payload.id
      axios({
        method: 'put',
        url: '/wishlists/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(({ data }) => {
        context.dispatch('GETWISHLISTS')
      }).catch(err => {
        console.log(err)
      })
    },
    ADDWISHLIST (context, payload) {
      const ProductId = payload.ProductId
      axios({
        method: 'post',
        url: '/wishlists/' + ProductId,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(({ data }) => {
        context.dispatch('GETWISHLISTS')
      }).catch(err => {
        console.log(err)
      })
    }
  },
  modules: {
  }
})
