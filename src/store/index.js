import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    statusLogin: false
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setCarts (state, payload) {
      state.carts = payload
    },
    checkLogin (state, payload) {
      state.statusLogin = payload
    }
  },
  actions: {
    register (context, payload) {
      axios({
        method: 'POST',
        url: '/register',
        data: payload
      })
        .then(_ => {
          console.log('berhasil register')
          router.push('/login')
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'Register successfully'
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })
        })
    },
    login (context, payload) {
      axios({
        method: 'POST',
        url: '/logincustomer',
        data: payload
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('access_token', data.access_token)
          router.push('/')
          context.commit('checkLogin', true)
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
        })
        .catch((err) => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid username/password'
          })
        })
    },
    fetchProduct (context) {
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((data) => {
          console.log(data.data.product)
          context.commit('setProducts', data.data.product)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchCart (context) {
      console.log('kepanggil?')
      axios({
        url: '/carts',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          console.log(res.data)
          context.commit('setCarts', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart (context, payload) {
      axios({
        url: '/carts',
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          ProductId: payload
        }
      })
        .then(res => {
          console.log(res.data)
          context.commit('setCarts', res.data)
          Swal.fire({
            icon: 'success',
            title: 'Added Successfully!',
            text: 'Please check your cart to completed order!'
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Stock Not Unavailable',
            text: 'Maximum order this product!'
          })
        })
    },
    deleteFromCart (context, id) {
      axios({
        method: 'DELETE',
        url: '/carts/' + id,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then((result) => {
          console.log(result.data)
          context.dispatch('fetchCart')
          Swal.fire({
            icon: 'success',
            title: 'Deleted Successfully!',
            text: 'thankyou!'
          })
        })
        .catch((err) => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })
        })
    },
    patchCart (context, payload) {
      axios({
        method: 'PATCH',
        url: '/carts/' + payload.id,
        data: { quantity: payload.quantity },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          console.log(res.data)
          context.dispatch('fetchCart')
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Stock Not Availabe',
            text: 'You have reached the minimum / maximum limit of stock'
          })
        })
    },
    dummyCheckout (context) {
      axios({
        method: 'DELETE',
        url: '/carts/',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then((result) => {
          // console.log(result.data)
          context.dispatch('fetchCart')
          Swal.fire({
            icon: 'success',
            title: 'Successfully empty the cart!',
            text: 'thankyou!'
          })
        })
        .catch((err) => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })
        })
    }
  },
  modules: {
  }
})
