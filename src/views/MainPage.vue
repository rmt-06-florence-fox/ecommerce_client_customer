<template>
  <div class="main-page">
    <NavBar></NavBar>
    <SideBar></SideBar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<script>
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Footer from '../components/Footer'

export default {
  name: 'MainPage',
  created () {
    if (localStorage.access_token) {
      this.$store.commit('SET_IS_AUTHENTICATED', true)
    }
    this.$store.dispatch('fetchCategories')
    this.$store.dispatch('fetchProducts')
  },
  components: {
    NavBar,
    SideBar,
    Footer
  }
}
</script>
<style>
  .main-page {
    overflow: hidden;
  }
</style>
