import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosInstance'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'Tadika Mesra',
    allProducts: [],
    price: 0,
    increment: false
  },
  mutations: {
    setIncrement (state, payload) {
      state.increment = payload
    },
    setAllProducts (state, payload) {
      state.allProducts = payload
    },
    setPrice (state, payload) {
      state.price = payload
    }
  },
  actions: {
    decrement (context, id) {
      return axios({
        method: 'patch',
        url: '/carts/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    deleteCart (context, id) {
      return axios({
        method: 'delete',
        url: '/carts/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          location.reload()
        })
        .catch(error => {
          console.log(error)
        })
    },
    totalPrice (context, payload) {
      let totalPrice
      for (let i = 0; i < this.state.allProducts.length; i++) {
        // const product = this.allProducts[i]
        // console.log(product)
        totalPrice += (1 * 1)
      }
      context.commit('setPrice', totalPrice)
    },
    getCarts (context, payload) {
      axios({
        method: 'GET',
        url: '/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          const data = response.data
          console.log(data)
          // this.allProducts = data
          // console.log(this.allProducts)
          context.commit('setAllProducts', data)
          // this.totalPrice()
          let totalPrice = 0
          for (let i = 0; i < data.length; i++) {
            const product = data[i]
            console.log(product)
            totalPrice += (Number(product.Product.price) * Number(product.count))
          }
          context.commit('setPrice', totalPrice)
          // console.log('haha')
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateCart (context, id) {
      return axios({
        method: 'PATCH',
        url: '/products/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          // console.log(response.data.increment)
          context.commit('setIncrement', response.data.increment)
          console.log('added to cart')
          // this.$router.push('/cart')
        })
        .catch(err => {
          console.log(err)
        })
    },
    register (context, payload) {
      return axios({
        method: 'post',
        url: '/register',
        data: payload
      })
    },
    fetchData (context) {
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          const data = response.data.data
          // this.allProducts = data
          // console.log(this.allProducts)
          context.commit('setAllProducts', data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getProductById (context, id) {
      return axios({
        method: 'GET',
        url: '/products/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    addProduct (context, obj) {
      return axios({
        method: 'post',
        url: '/products',
        data: {
          name: obj.name,
          stock: obj.stock,
          price: obj.price,
          image_url: obj.image_url
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    deleteProduct (context, id) {
      return axios({
        method: 'delete',
        url: '/products/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    updateProduct (context, obj) {
      return axios({
        method: 'put',
        url: '/products/' + obj.id,
        data: {
          name: obj.name,
          stock: obj.stock,
          price: obj.price,
          image_url: obj.image_url
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    }
  },
  modules: {
  }
})
