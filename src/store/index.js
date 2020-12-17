import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: null,
    productById: null,
    categories: null,
    banners: null,
    profile: null,
    cart: null,
    history: [],
    wishlists: [],
    filteredCategories: []
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
    },
    FILTERINGCATEGORIES (state, payload) {
      state.filteredCategories = payload
    }
  },
  actions: {
    GETPRODUCTS (context) {
      axios({
        method: 'get',
        url: '/products'
      }).then(({ data }) => {
        context.commit('GETPRODUCTS', data.products)
      }).catch(err => {
        console.log(err)
      })
    },
    GETPRODUCTBYID (context, payload) {
      axios({
        method: 'get',
        url: '/products/' + payload.id
      }).then(({ data }) => {
        context.commit('GETPRODUCTBYID', data.product)
      }).catch(err => {
        console.log(err)
      })
    },
    GETCATEGORIES (context) {
      axios({
        method: 'get',
        url: '/categories'
      }).then(({ data }) => {
        context.commit('GETCATEGORIES', data.categories)
      }).catch(err => {
        console.log(err)
      })
    },
    GETBANNERS (context) {
      axios({
        method: 'get',
        url: '/banners'
      }).then(({ data }) => {
        context.commit('GETBANNERS', data.banners)
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
        context.commit('GETCART', data.transaction)
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
        context.commit('GETHISTORY', data.transactions)
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
        context.commit('GETWISHLISTS', data.wishlists)
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
        context.dispatch('GETPRODUCTS')
      }).catch(err => {
        context.dispatch('GETCART')
        context.dispatch('GETPRODUCTS')
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
        context.dispatch('GETPRODUCTS')
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
        context.dispatch('GETPRODUCTS')
      }).catch(err => {
        console.log(err)
      })
    },
    DELETECART (context, payload) {
      const id = payload.id
      axios({
        method: 'delete',
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
        method: 'delete',
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
        console.log(err.response.data)
      })
    }
  },
  modules: {
  },
  getters: {
    activebanner: (state) => {
      if (state.banners) {
        return state.banners.filter(e => e.status === true)
      } else {
        return null
      }
    },
    filteredProduct: (state) => {
      if (state.products) {
        if (state.filteredCategories.length === 0) {
          return state.products
        } else {
          return state.products.filter(e => {
            for (let i = 0; i < state.filteredCategories.length; i++) {
              const element = state.filteredCategories[i]
              if (Number(element) === Number(e.CategoryId)) {
                return e
              }
            }
          })
        }
      } else {
        return null
      }
    },
    similarProduct: (state) => {
      if (state.productById && state.products) {
        const getbyCategory = state.products.filter(e => {
          return Number(e.CategoryId) === Number(state.productById.CategoryId) && Number(e.id) !== state.productById.id
        })
        return getbyCategory.slice(0, 3)
      } else {
        return null
      }
    },
    carts: (state) => {
      if (state.cart) {
        return state.cart.Products
      } else {
        return []
      }
    }
  }
})
