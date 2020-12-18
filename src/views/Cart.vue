<template>
  <div class="home">
    <Header></Header>
    <NavbarLogout></NavbarLogout>
    <ItemCards></ItemCards>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import NavbarLogout from '../components/NavbarLogout'
import ItemCards from '../components/ItemCards'
import Footer from '../components/Footer'

export default {
  name: 'Cart',
  components: {
    Header,
    NavbarLogout,
    ItemCards,
    Footer
  },
  methods: {
    fetchDataCart () {
      this.$store.dispatch('fetchDataCart')
    }
  },
  created () {
    this.fetchDataCart()
  }
}
</script>

<style>

</style>
