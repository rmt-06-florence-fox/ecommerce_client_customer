import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    onCart: [],
    history: []
  },
  mutations: {
    changeProducts (state, data) {
      state.products = data
    },
    changeOnCart (state, data) {
      state.onCart = data
    },
    changeHistory (state, data) {
      state.history = data
    }
  },
  actions: {
    fetchProducts (context) {
      axios({
        method: 'get',
        url: 'http://localhost:3001/products'
      })
        .then(({ data }) => {
          context.commit('changeProducts', data)
        })
        .catch(({ err }) => {
          console.log(err)
        })
    },
    fetchCart (context) {
      axios({
        method: 'get',
        url: 'http://localhost:3001/cart',
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhQG1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjA4MDEwNDIzfQ.dc0a_L2gSitGqTx5w8ZqsoqLZ2QDKQLIZ6fl1WCbVxI'
        }
      })
        .then(({ data }) => {
          context.commit('changeOnCart', data)
        })
        .catch(({ err }) => {
          console.log(err)
        })
    },
    paidProduct (context) {
      axios({
        method: 'get',
        url: 'http://localhost:3001/cart/history',
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhQG1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjA4MDEwNDIzfQ.dc0a_L2gSitGqTx5w8ZqsoqLZ2QDKQLIZ6fl1WCbVxI'
        }
      })
        .then(({ data }) => {
          context.commit('changeHistory', data)
        })
        .catch(({ err }) => {
          console.log(err)
        })
    },
    checkout (context) {
      return axios({
        method: 'patch',
        url: 'http://localhost:3001/cart',
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhQG1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjA4MDEwNDIzfQ.dc0a_L2gSitGqTx5w8ZqsoqLZ2QDKQLIZ6fl1WCbVxI'
        }
      })
    },
    addToCart (context, payload) {
      return axios({
        method: 'post',
        url: `http://localhost:3001/cart/add/${payload.id}`,
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhQG1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjA4MDEwNDIzfQ.dc0a_L2gSitGqTx5w8ZqsoqLZ2QDKQLIZ6fl1WCbVxI'
        },
        data: {
          Qty: payload.Qty
        }
      })
    },
    login (context, payload) {
      return axios({
        method: 'post',
        url: 'http://localhost:3001/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    register (context, payload) {
      return axios({
        method: 'post',
        url: 'http://localhost:3001/register',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    deleteFromCart (context, id) {
      return axios({
        method: 'delete',
        url: `http://localhost:3001/cart/${id}`,
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhQG1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjA4MDEwNDIzfQ.dc0a_L2gSitGqTx5w8ZqsoqLZ2QDKQLIZ6fl1WCbVxI'
        }
      })
    },
    updateQty (context, payload) {
      return axios({
        method: 'patch',
        url: `http://localhost:3001/cart/${payload.id}`,
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhQG1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjA4MDEwNDIzfQ.dc0a_L2gSitGqTx5w8ZqsoqLZ2QDKQLIZ6fl1WCbVxI'
        },
        data: {
          Qty: payload.Qty
        }
      })
    }
  },
  modules: {
  }
})
