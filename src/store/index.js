import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosinstance'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    isLogin: false,
    carts: [],
    histories: [],
    totalPrice: 0
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    checkLogin (state, payload) {
      state.isLogin = payload
    },
    setCarts (state, payload) {
      state.carts = payload
    },
    setHistories (state, payload) {
      state.histories = payload
    },
    setTotalPrice (state, payload) {
      state.totalPrice = payload
    }
  },
  actions: {
    register (context, payload) {
      axios({
        method: 'POST',
        url: '/customer/register',
        data: payload
      })
        .then(({ data }) => {
          const name = data.email.split('@')[0]
          console.log(data)
          Vue.toasted.show(`Hi ${name} !`)
          Vue.toasted.show('Thank you for your first regist !!!')
          Vue.toasted.show("Let's login before your first transaction !!!")
          router.push('/login')
        })
        .catch(err => {
          console.log(err.response.data.message)
          if (err.response.data.messages) {
            err.response.data.messages.forEach((e) => {
              Vue.toasted.error(e.message)
            })
          } else if (err.response.data.message) {
            Vue.toasted.error(err.response.data.message, { icon: 'times' })
          }
        })
    },
    login (context, payload) {
      axios({
        method: 'POST',
        url: '/customer/login',
        data: payload
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('access_token', data.access_token)
          Vue.toasted.success(`Hi ${data.email.split('@')[0]} ! Have a nice day !!!`, { icon: 'check' })
          router.push('/')
        })
        .catch(err => {
          // console.log(err.response.data.message)
          Vue.toasted.error(err.response.data.message, { icon: 'times' })
        })
    },
    fetchData (context) {
      axios({
        method: 'GET',
        url: '/products'
      })
        .then(({ data }) => {
          context.commit('setProducts', data.result)
        })
        .catch(err => console.log(err))
    },
    addCart (context, payload) {
      axios({
        method: 'POST',
        url: '/carts/' + payload.productId,
        data: { quantity: payload.quantity },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          if (router.history.current.name === 'Home') Vue.toasted.success('Success add the product !!!', { icon: 'check' })
          context.dispatch('fetchCarts')
        })
        .catch(err => {
          console.log(err.response.data)
          Vue.toasted.error(err.response.data.message, { icon: 'times' })
        })
    },
    fetchCarts (context) {
      axios({
        method: 'GET',
        url: '/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setCarts', data.data)
          context.commit('setTotalPrice', data.totalPrice)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteCart (context, id) {
      Vue.toasted.show('Are you sure ?', {
        action: [
          {
            text: 'Yes',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
              axios({
                method: 'DELETE',
                url: '/carts/' + id,
                headers: {
                  access_token: localStorage.getItem('access_token')
                }
              })
                .then(({ data }) => {
                  Vue.toasted.success(data.message, { icon: 'check' })
                  context.dispatch('fetchCarts')
                })
                .catch(err => console.log(err))
            }
          },
          {
            text: 'No',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
            }
          }
        ]
      })
    },
    checkout (context) {
      axios({
        method: 'PATCH',
        url: '/carts/checkout',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          Vue.toasted.success('Yeayy... Success checkout your transaction !!!', { icon: 'check' })
          context.dispatch('fetchCarts')
        })
        .catch(err => {
          console.log(err.response.data.messages)
          err.response.data.messages.forEach((e) => {
            Vue.toasted.error(e, { icon: 'times' })
          })
        })
    },
    fetchHistories (context) {
      axios({
        method: 'GET',
        url: '/carts/histories',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('setHistories', data)
        })
        .catch(err => console.log(err))
    }
  },
  modules: {
  }
})
