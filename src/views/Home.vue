<template>
  <div class="home">
    <Header></Header>
    <NavbarLogin></NavbarLogin>
    <Category></Category>
    <ItemCardsHome></ItemCardsHome>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import NavbarLogin from '../components/NavbarLogin'
import Footer from '../components/Footer'
import ItemCardsHome from '../components/ItemCardsHome'
import Category from '../components/Categorie'

export default {
  name: 'Home',
  components: {
    Header,
    NavbarLogin,
    Footer,
    ItemCardsHome,
    Category
  },
  methods: {
    fetchData () {
      this.$store.dispatch('fetchData')
    }
  },
  created () {
    this.fetchData()
  }
}
</script>
