<template>
<div>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand :to="{ name: 'Home' }">
      <img src="../assets/ShopPal-logo.svg"  style="position:relative;top:-0.2rem" width="30" height="30" alt="shopping bag">
       ShopPal
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="isAuthenticated">
        <b-nav-item :to="{ name: 'Home' }"><img src="../assets/home.svg" style="position:relative;top:-0.2rem" width="30" height="30" alt="home icon">
            Home
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-if="$route.name === 'Home'">
        <b-nav-item v-b-toggle.sidebar><img src="../assets/category.svg" style="position:relative;top:-0.2rem" width="30" height="30" alt="list icon">
            Categories
        </b-nav-item>
      </b-navbar-nav>
      <div v-if="$route.name === 'Home'" class="form-group search-container">
        <select v-model="searchKey.by" class="form-control search-by" name="search-by">
          <option value="name" selected>Name</option>
          <option value="category">Category</option>
        </select>
        <input v-model="searchKey.words" @keyup="setSearchKey" class="form-control" id="search" type="text" placeholder="search ...">
      </div>
      <!-- Right aligned nav items -->
      <b-navbar-nav v-if="isAuthenticated" class="ml-auto">
        <b-nav-item :to="{ name: 'Wishlist' }">
          <img src="../assets/star.svg"  style="position:relative;top:-0.2rem" width="30" height="30" alt="star icon">
            Favorites
        </b-nav-item>
        <b-nav-item :to="{ name: 'Cart' }">
          <img src="../assets/cart.svg"  style="position:relative;top:-0.2rem" width="30" height="30" alt="shopping cart">
            Cart
        </b-nav-item>
        <b-nav-item :to="{ name: 'History' }">
          <img src="../assets/history.svg"  style="position:relative;top:-0.2rem" width="30" height="30" alt="history icon">
            History
        </b-nav-item>
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content >
            <em>{{ username }}</em>
          </template>
          <b-dropdown-item id="btn-logout" @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav v-if="!isAuthenticated" class="ml-auto">
        <b-dropdown-item variant="light" id="btn-login" @click="goLogin">Sign In</b-dropdown-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>
import Vue from 'vue'
import Swal from 'sweetalert2'
import { LoaderPlugin } from 'vue-google-login'
Vue.use(LoaderPlugin, {
  client_id: '861795519447-17vmd84rog7jj1k0q31k1j1n10nbj6sm.apps.googleusercontent.com'
})
export default {
  name: 'NavBar',
  data () {
    return {
      fullName: localStorage.getItem('fullName'),
      searchKey: {
        by: 'name',
        words: ''
      }
    }
  },
  methods: {
    goLogin () {
      this.$router.push('/login')
    },
    logout () {
      localStorage.clear()
      Vue.GoogleAuth.then((auth2) => {
        auth2.signOut().then(function () {
          console.log('User signed out.')
        })
      })
      Swal.fire(
        'Signed Out!',
        'See you soon!',
        'success'
      )
      this.$store.commit('SET_IS_AUTHENTICATED', false)
    },
    setSearchKey () {
      if (this.searchKey.words !== '') {
        this.$store.commit('SET_SEARCH_KEY', this.searchKey)
      }
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.isAuthenticated
    },
    username () {
      return this.$store.state.username
    }
  }
}
</script>
<style>

</style>
