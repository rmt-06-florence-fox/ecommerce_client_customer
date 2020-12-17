<template>
  <div class="home">
    <Header></Header>
    <NavbarLogin></NavbarLogin>
    <ItemCardsHome v-for="data in dataItems.data"
    :key="data.id" :data="data"></ItemCardsHome>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import NavbarLogin from '../components/NavbarLogin'
import Footer from '../components/Footer'
import ItemCardsHome from '../components/ItemCardsHome'

export default {
  name: 'Home',
  components: {
    Header,
    NavbarLogin,
    Footer,
    ItemCardsHome
  },
  methods: {
    fetchData () {
      this.$store.dispatch('fetchData')
    }
  },
  created () {
    this.fetchData()
  },
  computed: {
    dataItems () {
      return this.$store.state.dataItems
    }
  }
}
</script>
