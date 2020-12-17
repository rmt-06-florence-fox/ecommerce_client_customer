import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

const serverUrl = 'http://localhost:3000' 

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: [],
    myCarts: [],
    isLogin: false
  },
  mutations: {
    SET_PRODUCTS(state, productsData) {
      state.products = productsData
    },
    SET_MYCARTS(state, myCartsData) {
      state.myCarts = myCartsData
    },
    SET_LOGINSTATUS(state, loginStatus) {
      state.isLogin = loginStatus
    },
  },
  actions: {
    login(context, payload) {
      axios({
        method: 'POST',
        url: serverUrl + '/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
      .then(({data}) => {
        const access_token = data.access_token
        const role = data.role
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('role', role)
        context.commit('SET_LOGINSTATUS', true);
        router.push({ name: 'Home' })
      })
      .catch(error => {
        console.log(`Login Error => ${error}`);
      })
    },
    logout(context) {
      localStorage.removeItem("access_token")
      conetxt.commit('SET_LOGINSTATUS', false)
    },
    fetchProducts(context, payload) {
      axios({
        method: 'GET',
        url: serverUrl + `/allproducts`,
      })
      .then(({data}) => {
        console.log(data);
        context.commit('SET_PRODUCTS', data)
      })
      .catch(error => {
        console.log(error);
      })
    },
    fetchCarts(context, payload) {
      axios({
        method: 'GET',
        url: serverUrl + `/carts`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({data}) => {
        console.log(data.cart);
        context.commit('SET_MYCARTS', data)
      })
      .catch(error => {
        console.log(error);
      })
    }
  },
  modules: {
  }
})
