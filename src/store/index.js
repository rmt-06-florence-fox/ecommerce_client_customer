import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
// import Swal from 'sweetalert2'
// import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    GET_PRODUCTS (state, data) {
      state.products = data
    }
  },
  actions: {
    fetchProducts (context) {
      axios({
        url: '/products',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          data.forEach(el => {
            el.price = `Rp ${el.price}`
          })
          context.commit('GET_PRODUCTS', data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
