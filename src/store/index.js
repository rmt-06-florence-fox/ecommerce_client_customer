import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import instance from "../config/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productList: [],
    message: "",
    isLogin: false,
    showCart: false,
    showWishlist: false,
    showProductDisplay: true
  },
  mutations: {
    SET_DATA(state, products) {

      state.productList = [];
      products.forEach(product => {
        product.isAddedToCart = false;
        product.onWishList = false;
        product.onCart= 0;
        state.productList.push(product);
      });
    },
    SET_CART(state, id) {
      if (state.isLogin == false) {
        router.push('/login')
      } else {
        state.productList.forEach(product => {
          if (id === product.id) {
            product.isAddedToCart = !product.isAddedToCart;
          } else if (id === "all") {
            product.isAddedToCart = false;
            product.onCart=0;
          }
        })
      }
    },
    COUNT_CART(state, payload){
      state.productList.forEach(product => {
        if (payload === product.id) {
          product.onCart = payload.count
        } 
      })
    },

    SET_WISHLIST(state, id) {
      if (state.isLogin == false) {
        router.push('/login')
      } else {
        state.productList.forEach(product => {
          if (id === product.id) {
            product.onWishList = !product.onWishList;
          }
        });
      }
    },

    SET_ERR_MESSAGE(state, payload) {
      state.message = payload;
    },
    SET_LOGIN(state, payload) {
      state.isLogin = payload;
    },

    SET_DISPLAY(state, payload) {
      if (payload == "WishList") {
        state.showWishlist = true;
        state.showCart = false;
        state.showProductDisplay = false;
      } else if (payload == "Cart") {
        state.showCart = true;
        state.showWishlist = false;
        state.showProductDisplay = false;
      } else {
        state.showProductDisplay = true;
        state.showWishlist = false;
        state.showCart = false;
      }
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
          console.log(data.message)
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
    showItem({ commit }, item) {
      commit("SET_DISPLAY", item);
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
    },
    removeCart({ commit }) {
      commit("SET_CART", "all");
    },
    countCartItem({commit}, data){
      commit('COUNT_CART', data)
    }
  },
  getters: {
    productsOnWishList: state => {
      return state.productList.filter(product => {
        return product.onWishList;
      });
    },
    productsAddedToCart: state => {
      return state.productList.filter(product => {
        return product.isAddedToCart;
      });
    },
    countItemOnCart: (state) => (id) => {
      return state.productList.find(product => product.id === id)
    }
  },
  modules: {}
});