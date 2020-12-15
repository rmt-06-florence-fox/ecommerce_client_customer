import Vue from 'vue'
import Vuex from 'vuex'

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
    }
  },
  modules: {
  }
})
