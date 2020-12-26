import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'JAM TANGEN',
    user: null,
    products: [],
    categories: [],
    banners: [],
    carts: [],
    totalPrice: [],
    addCartErr: null,
    postCheckout: false,
    wishlists: null
  },
  mutations: {
    setUser (state, value) {
      state.user = value
    },
    setProducts (state, value) {
      state.products = value
    },
    setCategories (state, value) {
      state.categories = value
    },
    setBanners (state, value) {
      state.banners = value
    },
    setCart (state, value) {
      state.carts = value
    },
    setTotalPrice (state, value) {
      const container = []
      let check = null
      // let index = null
      state.totalPrice.forEach((el, i) => {
        if (el.cart.Product.name === value.cart.Product.name) {
          check = el
          // index = i
          container.push(value)
        } else {
          container.push(el)
        }
      })
      // console.log(check, index)
      if (check) {
        state.totalPrice = container
      } else {
        state.totalPrice.push(value)
      }
    },
    resetTotalPrice (state, value) {
      state.totalPrice = value
    },
    deleteTotalPrice (state, index, value) {
      state.totalPrice.splice(+index, 1)
    },
    setAddCartErr (state, val) {
      state.addCartErr = val
    },
    setpostCheckout (state, value) {
      state.postCheckout = value
    },
    setWishlists (state, value) {
      state.wishlists = value
    }
  },
  actions: {
    loadProducts (context) {
      axios({
        method: 'get',
        url: '/product'
      })
        .then(res => {
          context.commit('setProducts', res.data.products)
        })
    },
    loadUser (context) {
      axios({
        method: 'get',
        url: '/user',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          context.commit('setUser', res.data)
        })
    },
    loadCategories (context) {
      axios({
        method: 'get',
        url: '/categories'
      })
        .then(res => {
          context.commit('setCategories', res.data)
        })
    },
    loadCarts (context) {
      axios({
        method: 'get',
        url: '/cart',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          context.commit('setCart', res.data)
        })
    },
    checkout (context, val) {
      // console.log(val)
      axios({
        method: 'post',
        url: '/cart/checkout',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          checkout: val
        }
      })
        .then(res => {
          return true
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
          }
          console.log(error.config)
        })
    },
    loadBanners (context) {
      axios({
        method: 'get',
        url: '/banner',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          context.commit('setBanners', res.data)
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
          }
          console.log(error.config)
        })
    },
    loadWishLists (context) {
      axios({
        method: 'get',
        url: '/product/wishlist',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          context.commit('setWishlists', res.data)
        })
    },
    deleteWish (context, id) {
      axios({
        method: 'delete',
        url: `/product/wishlist/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          console.log(res.data)
          context.dispatch('loadWishLists')
        })
    }
  },
  modules: {
  },
  getters: {
    getTotal: state => {
      let total = 0
      state.totalPrice.forEach(el => { total += el.total })
      return total
    },
    producOnDetail: state => id => {
      return state.totalPrice[id]
    },
    filterProduct: state => cat => {
      if (!cat) {
        return state.products
      } else {
        const data = []
        state.products.forEach(el => {
          el.Categories.map(child => {
            if (+child.id === +cat) {
              console.log(child.id, cat)
              data.push(el)
            }
          })
        })
        return data
      }
    },
    getBigBanners: state => {
      return state.banners.filter(el => el.size === 'lg')
    },
    getMediumBanners: state => {
      return state.banners.filter(el => el.size === 'md')
    },
    getSmallBanners: state => {
      return state.banners.filter(el => el.size === 'sm')
    },
    getWishedProduct: state => id => {
      return state.products.find(el => el.id === id)
    }
  }
})
