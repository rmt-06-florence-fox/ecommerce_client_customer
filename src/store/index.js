import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import instance from "../config/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productList: [],
    message: "",
    isLogin: false
  },
  mutations: {
    SET_DATA(state, products) {
      // state.productList = payload;
      state.productList = [];
      products.forEach(product => {
        product.isAddedToCart = false;
        product.onWishList = false;
        state.productList.push(product);
      });
    },
    SET_CART(state, id) {
      state.productList.forEach(product => {
        if (id === product.id) {
          product.isAddedToCart = !product.isAddedToCart;
        }
      });
    },

    SET_WISHLIST(state, id) {
      state.productList.forEach(product => {
        if (id === product.id) {
          product.onWishList = !product.onWishList;
        }
      });
    },

    SET_ERR_MESSAGE(state, payload) {
      state.message = payload;
    },
    SET_LOGIN(state, payload) {
      state.isLogin = payload;
    }
  },
  actions: {
    login({ commit }, payload) {
      instance
        .post("/login", {
          email: payload.email,
          password: payload.password
        })
        .then(({ data }) => {
          commit("SET_LOGIN", true);
          localStorage.access_token = data.access_token;
          localStorage.name = data.name;
          router.push("/");
        })
        .catch(err => {
          const message = err.response.data.message;
          commit("SET_ERR_MESSAGE", message);
        });
    },
    register({ commit }, payload) {
      instance
        .post("/register", {
          name: payload.name,
          email: payload.email,
          password: payload.password
        })
        .then(({ data }) => {
          // commit('SET_LOGIN', true)
          // localStorage.access_token = data.access_token
          // localStorage.name = data.name
          console.log(data);
          router.push("/login");
        })
        .catch(err => {
          const message = err.response.data.message;
          commit("SET_ERR_MESSAGE", message);
        });
    },
    fetchData({ commit }) {
      instance
        .get("/products")
        .then(({ data }) => {
          commit("SET_DATA", data);
        })
        .catch(err => {
          const message = err.response.data.message;
          commit("SET_ERR_MESSAGE", message);
        });
    },

    addToCart({ commit }, id) {
      commit("SET_CART", id);
    },

    removeFromCart({ commit }, id) {
      commit("SET_CART", id);
    },

    addToWishList({ commit }, id) {
      commit("SET_WISHLIST", id);
    },

    removeFromWishList({ commit }, id) {
      commit("SET_WISHLIST", id);
    },

    logout({ commit }) {
      localStorage.clear();
      commit("SET_LOGIN", false);
    }
  },
  getters: {
    productsOnWishList: state => {
      return state.productList.filter(product => {
        return product.onWishList;
      });
    }
  },
  modules: {}
});
