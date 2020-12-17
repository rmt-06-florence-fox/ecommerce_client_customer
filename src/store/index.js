import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../config/axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    isLoggedIn: null
  },
  mutations: {
    setProduct (state, payload) {
      state.products = payload
    },
    setCart (state, payload) {
      state.carts = payload
    },
    setLogin (state, payload) {
      state.isLoggedIn = payload
    }
  },
  actions: {
    register (context, payload) {
      axios({
        url: '/register',
        method: 'POST',
        data: payload
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Register success',
            text: 'please login now!'
          },
          router.push('/login')
          )
        })
        .catch(_ => {
          // console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Register failed',
            text: 'your password is too weak!'
          })
        })
    },

    login (context, payload) {
      axios({
        url: '/loginUser',
        method: 'POST',
        data: payload
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Login success',
            text: 'Enjoy your shopping!'
          })
          localStorage.setItem('access_token', data.access_token)
          context.commit('setLogin', true)
          router.push('/')
        })
        .catch(_ => {
          // console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Login failed',
            text: 'Incorrect email or password!'
          })
        })
    },

    fetchData (context, payload) {
      axios({
        url: '/product',
        method: 'GET',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          // console.log(data)
          context.commit('setProduct', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    addToCart (context, payload) {
      const ProductId = +payload
      axios({
        url: `/cart/${ProductId}`,
        method: 'POST',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          // console.log(data)
          Swal.fire({
            icon: 'success',
            title: 'Add success',
            text: 'Yeaay! succesfully add an item to your cart'
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Please login first',
            text: 'Sorry! fail add an item to your cart'
          })
        })
    },

    fetchCart (context, payload) {
      console.log('masukk')
      axios({
        url: '/cart',
        method: 'GET',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          // console.log(data)
          context.commit('setCart', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    deleteItemOnCart (context, payload) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          const ProductId = +payload
          axios({
            url: `/cart/${ProductId}`,
            method: 'DELETE',
            headers: { access_token: localStorage.getItem('access_token') }
          })
            .then(({ data }) => {
              this.dispatch('fetchCart')
            })
            .catch(err => {
              console.log(err)
            })
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
    },

    updateQuantity (context, payload) {
      const CartId = +payload.id
      axios({
        url: `/cart/${CartId}`,
        method: 'PATCH',
        headers: { access_token: localStorage.getItem('access_token') },
        data: { quantity: payload.quantity }
      })
        .then(({ data }) => {
          console.log(data)
          this.dispatch('fetchCart')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
