import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosins'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: ''
  },
  mutations: {
    setStatus (state, payload) {
      console.log(payload)
      state.status = payload
    }
  },
  actions: {
    login (context, payload) {
      console.log(payload)
      axios({
        url: '/logincustomer',
        method: 'post',
        data: payload
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('access_token', data.access_token)
          context.commit('setStatus', 'loggedIn')
          if (router.history.current.name !== 'Home') {
            router.push('/')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    register (context, payload) {
      console.log(payload)
      axios({
        url: '/register',
        method: 'post',
        data: payload
      })
        .then(({ data }) => {
          console.log(data)
          router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
