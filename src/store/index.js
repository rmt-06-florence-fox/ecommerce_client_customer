import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosinstance'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
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
            Vue.toasted.error(err.response.data.message)
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
          Vue.toasted.success(`Hi ${data.email.split('@')[0]} ! Have a nice day !!!`)
          router.push('/')
        })
        .catch(err => {
          // console.log(err.response.data.message)
          Vue.toasted.error(err.response.data.message)
        })
    }
  },
  modules: {
  }
})
