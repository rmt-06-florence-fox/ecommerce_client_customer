import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
// import swal from 'sweetalert'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    register (context, payload) {
      return axios({
        url: '/register',
        method: 'POST',
        data: payload
      })
    },
    login (context, payload) {
      return axios({
        url: '/login',
        method: 'POST',
        data: payload
      })
    }
  },
  modules: {
  }
})
