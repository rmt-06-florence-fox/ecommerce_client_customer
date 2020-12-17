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
      <b-navbar-nav>
        <b-nav-item v-b-toggle.sidebar><img src="../assets/category.svg" style="position:relative;top:-0.2rem" width="30" height="30" alt="list icon">
            Categories
        </b-nav-item>
      </b-navbar-nav>
      <div v-if="$route.name === 'Home'" class="form-group search-container">
        <select v-model="searchKey.by" class="form-control search-by" name="search-by">
          <option value="name" selected>Name</option>
          <option value="category">Category</option>
        </select>
        <input v-model="searchKey.words" @keyup="setSearchKey" class="form-control search border-light" type="text" placeholder="search ...">
      </div>
      <!-- Right aligned nav items -->
      <b-navbar-nav v-if="isAuthenticated" class="ml-auto">
        <!-- <b-nav-item :to="{ name: 'Home' }">
          <img src="../assets/star.svg"  style="position:relative;top:-0.2rem" width="30" height="30" alt="star icon">
            Favorites
        </b-nav-item> -->
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
          <template #button-content>
            <em>{{ fullName }}</em>
          </template>
          <b-dropdown-item @click="logout">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav v-if="!isAuthenticated" class="ml-auto">
        <b-dropdown-item @click="goLogin">Log In</b-dropdown-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>
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
      this.$store.commit('SET_IS_AUTHENTICATED', false)
      this.$router.push('/')
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
    }
  }
}
</script>
<style>
  .search-container {
   display: flex;
   justify-content: center;
   margin-top: 0.7rem;
}

.search-by {
   min-width: 5rem;
   font-size: 0.8rem;
   border-radius: 0.5rem;
   border: solid gray 0.1rem;
   margin-right: 1rem;
   color: black;
   font-weight: 500;
}

.search {
   min-width: 10rem;
   font-size: 0.8rem;
   border-radius: 0.1rem;
   border: solid gray 0.1rem !important;
}
</style>
