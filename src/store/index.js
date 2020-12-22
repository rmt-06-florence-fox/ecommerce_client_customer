import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosinstance'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    category: null,
    categories: [],
    inStockProducts: [],
    noStockProducts: [],
    inStockCarts: [],
    noStockCarts: [],
    total: 0,
    histories: [],
    inStockWishlists: [],
    noStockWishlists: [],
    arrWishlistProductId: [],
    searchKey: {},
    isAuthenticated: false,
    username: ''
  },
  mutations: {
    SET_CATEGORY (state, payload) {
      state.category = payload
    },
    SET_CATEGORIES (state, payload) {
      state.categories = payload
    },
    SET_INSTOCK_PRODUCTS (state, payload) {
      state.inStockProducts = payload
    },
    SET_NOSTOCK_PRODUCTS (state, payload) {
      state.noStockProducts = payload
    },
    SET_INSTOCK_CARTS (state, payload) {
      state.inStockCarts = payload
    },
    SET_NOSTOCK_CARTS (state, payload) {
      state.noStockCarts = payload
    },
    SET_TOTAL (state, payload) {
      state.total = payload
    },
    SET_HISTORIES (state, payload) {
      state.histories = payload
    },
    SET_SEARCH_KEY (state, payload) {
      state.searchKey = payload
    },
    SET_IS_AUTHENTICATED (state, payload) {
      state.isAuthenticated = payload
    },
    SET_USERNAME (state, payload) {
      state.username = payload
    },
    SET_INSTOCK_WISHLISTS (state, payload) {
      state.inStockWishlists = payload
    },
    SET_NOSTOCK_WISHLISTS (state, payload) {
      state.noStockWishlists = payload
    },
    SET_WISHLIST_PRODUCTS (state, payload) {
      state.arrWishlistProductId = payload
    }
  },
  actions: {
    fetchCategories ({ commit }) {
      axios
        .get('/categories', {
          headers: { access_token: localStorage.getItem('access_token') }
        })
        .then(({ data }) => {
          data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
          commit('SET_CATEGORIES', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchProducts ({ commit }) {
      axios
        .get('/products', {
        })
        .then(({ data }) => {
          const inStockProducts = []
          const noStockProducts = []
          data.map((product) => {
            if (product.stock === 0) {
              noStockProducts.push(product)
            } else if (product.stock > 0) {
              inStockProducts.push(product)
            }
          })
          commit('SET_INSTOCK_PRODUCTS', inStockProducts)
          commit('SET_NOSTOCK_PRODUCTS', noStockProducts)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchCarts ({ commit }) {
      axios
        .get('/carts', { headers: { access_token: localStorage.getItem('access_token') } })
        .then(({ data }) => {
          let total = 0
          const inStockCarts = []
          const noStockCarts = []
          data.map((cart) => {
            if (cart.Product.stock === 0) {
              noStockCarts.push(cart)
            } else if (cart.Product.stock > 0) {
              inStockCarts.push(cart)
            }
            if (cart.Product.stock > 0 && cart.quantity <= cart.Product.stock) {
              total += cart.quantity * cart.Product.price
            }
          })
          commit('SET_INSTOCK_CARTS', inStockCarts)
          commit('SET_NOSTOCK_CARTS', noStockCarts)
          commit('SET_TOTAL', total)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchHistories ({ commit }) {
      axios
        .get('/histories', { headers: { access_token: localStorage.getItem('access_token') } })
        .then(({ data }) => {
          commit('SET_HISTORIES', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchWishlists ({ commit }) {
      axios
        .get('/wishlists', { headers: { access_token: localStorage.getItem('access_token') } })
        .then(({ data }) => {
          const arrProductId = []
          const inStockWishlists = []
          const noStockWishlists = []
          data.map((wishlist) => {
            if (wishlist.Product.stock === 0) {
              noStockWishlists.push(wishlist)
            } else if (wishlist.Product.stock > 0) {
              inStockWishlists.push(wishlist)
            }
            arrProductId.push(wishlist.Product.id)
          })
          commit('SET_INSTOCK_WISHLISTS', inStockWishlists)
          commit('SET_NOSTOCK_WISHLISTS', noStockWishlists)
          commit('SET_WISHLIST_PRODUCTS', arrProductId)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchProfile ({ commit }) {
      axios
        .get('/customer/profile', {
          headers: { access_token: localStorage.getItem('access_token') }
        })
        .then(({ data }) => {
          commit('SET_USERNAME', data.fullName)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addCart (context, payload) {
      return axios
        .post(`/carts/${payload}`, {}, {
          headers: { access_token: localStorage.getItem('access_token') }
        })
    },
    addWishlist (context, payload) {
      return axios
        .post(`/wishlists/${payload}`, {}, {
          headers: { access_token: localStorage.getItem('access_token') }
        })
    },
    deleteWishlist (context, payload) {
      return axios
        .delete(`/wishlists/${payload}`, {
          headers: { access_token: localStorage.getItem('access_token') }
        })
    },
    deleteWishlistFromProduct (context, payload) {
      return axios
        .delete(`/wishlists/ProductId/${payload}`, {
          headers: { access_token: localStorage.getItem('access_token') }
        })
    },
    updateQuantity (context, payload) {
      return axios
        .patch(`/carts/${payload.CartId}`, { quantity: payload.quantity }, {
          headers: { access_token: localStorage.getItem('access_token') }
        })
    },
    deleteCart (context, payload) {
      return axios
        .delete(`/carts/${payload}`, {
          headers: { access_token: localStorage.getItem('access_token') }
        })
    },
    deleteHistory (context, payload) {
      return axios
        .delete(`/histories/${payload}`, {
          headers: { access_token: localStorage.getItem('access_token') }
        })
    },
    checkout (context, payload) {
      const results = []
      const promises = []
      for (let i = 0; i < context.state.inStockCarts.length; i++) {
        const ProductId = context.state.inStockCarts[i].Product.id
        const quantity = context.state.inStockCarts[i].quantity
        const CartId = context.state.inStockCarts[i].id
        const historyData = {
          name: context.state.inStockCarts[i].Product.name,
          image_url: context.state.inStockCarts[i].Product.image_url,
          price: context.state.inStockCarts[i].Product.price,
          quantity: context.state.inStockCarts[i].quantity
        }
        const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwODE3MDU3OX0.ZY60r3QOeoq_RaJxRs1j70upDOAgpjzQbRMvVoWGkVA'
        promises.push(
          axios
            .patch(`/products/${ProductId}`, { quantity }, { headers: { access_token: accessToken } })
            .then((response) => {
              results.push(response)
              return axios
                .post('/histories', historyData, { headers: { access_token: localStorage.getItem('access_token') } })
                .then((response) => {
                  results.push(response)
                  return axios
                    .delete(`/carts/${CartId}`, { headers: { access_token: localStorage.getItem('access_token') } })
                    .then((response) => {
                      results.push(response)
                    })
                })
            })
        )
      }
      return Promise.all(promises)
    }
  },
  getters: {
    inStockProductsFiltered: (state) => {
      if (state.searchKey.words && state.searchKey.by) {
        return state.inStockProducts.filter((product) => {
          if (state.searchKey.by === 'name') {
            if (product.name.toLowerCase().includes(state.searchKey.words.toLowerCase())) {
              return product
            }
          } else if (state.searchKey.by === 'category') {
            return product.Category.name.toLowerCase().includes(state.searchKey.words.toLowerCase())
          }
        })
      } else {
        return state.inStockProducts
      }
    },
    noStockProductsFiltered: (state) => {
      if (state.searchKey.words && state.searchKey.by) {
        return state.noStockProducts.filter((product) => {
          if (state.searchKey.by === 'name') {
            if (product.name.toLowerCase().includes(state.searchKey.words.toLowerCase())) {
              return product
            }
          } else if (state.searchKey.by === 'category') {
            return product.Category.name.toLowerCase().includes(state.searchKey.words.toLowerCase())
          }
        })
      } else {
        return state.noStockProducts
      }
    }
  }
})
