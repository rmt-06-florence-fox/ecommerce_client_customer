<template>
<!-- This example requires Tailwind CSS v2.0+ -->
<div class="bg-white h-screen">
<Navbar />
  <router-view :key="$route.fullPath" />
  <Footer />
</div>
</template>

<script>
// import productCard from './components/ProductCard'
import { mapState } from 'vuex'
import Footer from './components/footer'
import Navbar from './components/Navbar'

export default {
  components: {
    // productCard,
    Footer,
    Navbar
  },
  computed: {
    ...mapState({
      products: 'products'
    })
  },
  created () {
    this.$store.dispatch('loadProducts')
    this.$store.dispatch('loadCategories')
    this.$store.dispatch('loadBanners')
    if (localStorage.getItem('access_token')) {
      this.$store.dispatch('loadUser')
      this.$store.dispatch('loadWishLists')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* #nav {
  padding: 30px;
} */

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
