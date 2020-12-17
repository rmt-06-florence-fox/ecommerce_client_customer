import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router/index'
import Swal from 'sweetalert2'

Vue.use(Vuex)
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: false,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export default new Vuex.Store({
  state: {
    products: [],
    isLogin: false,
    carts: [],
    totalPrice: 0,
    wishes: [],
    history: []
  },
  mutations: {
    populateProducts (state, payload) {
      state.products = payload
    },
    populateHistory (state, payload) {
      state.history = payload
    },
    changeIsLogin (state) {
      state.isLogin = true
    },
    backLogin (state) {
      state.isLogin = false
    },
    populateCarts (state, payload) {
      state.carts = payload
    },
    IncrementPrice (state, payload) {
      state.totalPrice = +payload
    },
    populateWish (state, payload) {
      state.wishes = payload
    }
  },
  actions: {
    fetchProduct (context) {
      axios
        .get('/products')
        .then(data => {
          context.commit('populateProducts', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    register (context, payload) {
      axios
        .post('/register', payload)
        .then(user => {
          Toast.fire({
            icon: 'success',
            title: 'Register successfully'
          })
          router.push('/login')
        })
        .catch(err => {
          console.log(err)
          Toast.fire({
            icon: 'error',
            title: 'Email already used'
          })
        })
    },
    login (context, payload) {
      axios
        .post('/loginCustomer', payload)
        .then(user => {
          console.log(user.data)
          localStorage.setItem('accesstoken', user.data.accesstoken)
          Toast.fire({
            icon: 'success',
            title: 'Login Success'
          })
          context.commit('changeIsLogin')
          router.push('/')
        })
        .catch(err => {
          console.log(err)
          Toast.fire({
            icon: 'error',
            title: 'Invalid Account'
          })
        })
    },
    addToCart (context, payload) {
      // console.log(payload)
      const accesstoken = localStorage.accesstoken
      axios({
        method: 'post',
        url: `/carts/${payload.id}`,
        headers: {
          accesstoken
        }
      })
        // .post(`/carts/${payload.id}`, {}, { headers: accesstoken })
        .then(data => {
          Toast.fire({
            icon: 'success',
            title: `add 1 ${payload.name} in Cart`
          })
          context.dispatch('fetchCarts')
        })
        .catch(err => {
          console.log(err.message, '<<<<')
          if (err.message === 'Request failed with status code 401') {
            Toast.fire({
              icon: 'error',
              title: 'Login First'
            })
          } else {
            Toast.fire({
              icon: 'info',
              title: 'Add quantity from Your Cart'
            })
          }
        })
    },
    fetchCarts (context) {
      const accesstoken = localStorage.accesstoken
      axios({
        method: 'get',
        url: '/carts',
        headers: {
          accesstoken
        }
      })
        .then(data => {
          let counter = 0
          const trueData = []
          const falseData = []
          console.log('>>>', data.data)
          for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].status) {
              trueData.push(data.data[i])
            } else {
              falseData.push(data.data[i])
            }
          }
          for (let i = 0; i < trueData.length; i++) {
            const totalPrice = trueData[i].quantity * trueData[i].Product.price
            counter = counter + totalPrice
          }
          context.commit('IncrementPrice', counter)
          context.commit('populateCarts', trueData)
          context.commit('populateHistory', falseData)
          console.log(trueData, '<<<<')
        })
        .catch(err => {
          console.log(err)
        })
    },
    destroyCart (context, id) {
      const accesstoken = localStorage.accesstoken
      axios({
        method: 'delete',
        url: `/carts/${id}`,
        headers: {
          accesstoken
        }
      })
        .then(data => {
          console.log(data)
          context.dispatch('fetchCarts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateCart (context, payload) {
      const accesstoken = localStorage.accesstoken
      axios({
        method: 'patch',
        url: `/carts/${payload.id}`,
        data: { quantity: payload.quantity },
        headers: {
          accesstoken
        }
      })
        .then(data => {
          context.dispatch('fetchCarts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    checkout (context) {
      const accesstoken = localStorage.accesstoken
      axios({
        method: 'patch',
        url: '/checkout',
        headers: {
          accesstoken
        }
      })
        .then(data => {
          console.log('masuk')
          console.log(data)
          router.push('/checkout')
          context.dispatch('fetchCarts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    addWish (context, payload) {
      const accesstoken = localStorage.accesstoken
      axios({
        method: 'post',
        url: `/wish/${payload.id}`,
        headers: {
          accesstoken
        }
      })
        .then(data => {
          Toast.fire({
            icon: 'success',
            title: `add ${payload.name} in Wishlist`
          })
          // context.dispatch('fetchCarts')
        })
        .catch(err => {
          console.log(err.message, '<<<<')
          if (err.message === 'Request failed with status code 401') {
            Toast.fire({
              icon: 'error',
              title: 'Login First'
            })
          } else {
            Toast.fire({
              icon: 'warning',
              title: 'Item Already in Whislist'
            })
          }
        })
    },
    fetchWish (context) {
      const accesstoken = localStorage.accesstoken
      axios({
        method: 'get',
        url: '/wish',
        headers: {
          accesstoken
        }
      })
        .then(data => {
          context.commit('populateWish', data)
          console.log(context.state.wishes.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    destroyWish (context, id) {
      const accesstoken = localStorage.accesstoken
      axios({
        method: 'delete',
        url: `/wish/${id}`,
        headers: {
          accesstoken
        }
      })
        .then(data => {
          console.log(data)
          context.dispatch('fetchWish')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
