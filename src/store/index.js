import Vue from "vue";
import Vuex from "vuex";
// import router from '../router'
import instance from '../config/axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productList: '',
    message: ''
  },
  mutations: {
    SET_DATA(state, payload) {
      state.productList = payload
    },
    SET_ERR_MESSAGE(state, payload) {
      state.message = payload
    },
  },
  actions: {
    fetchData({ commit }) {
      instance.get('/products', {
        headers: { access_token: localStorage.access_token }
      })
        .then(({ data }) => {
          commit('SET_DATA', data)
        })
        .catch(err => {
          const message = err.response.data.message
          commit('SET_ERR_MESSAGE', message)
        })
    },
  },
  modules: {}
});
