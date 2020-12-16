import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosconfig'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    doSignIn (context, payload) {
      return axios({
        url: 'signin',
        method: 'post',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          router.push('home')
        })
        .catch(err => console.log(err))
    },
    doSignUp (context, payload) {
      return axios({
        url: 'signup',
        method: 'post',
        data: payload
      })
        .then(() => router.push('/'))
        .catch(err => console.log(err))
    }
  },
  modules: {
  }
})
