<template>
    <div>
        <Header></Header>
        <NavbarLogout></NavbarLogout>
        <ItemCart v-for="data in dataItems.data"
        :key="data.id" :data="data"></ItemCart>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../components/Header'
import NavbarLogout from '../components/NavbarLogout'
import ItemCart from '../components/ItemCart'
import Footer from '../components/Footer'

export default {
  name: 'MainPage',
  components: {
    Header,
    NavbarLogout,
    Footer,
    ItemCart
  },
  methods: {
    fetchData () {
      this.$store.dispatch('fetchData')
    }
  },
  created () {
    this.fetchData()
    const accesToken = localStorage.getItem('acces_token')
    if (!accesToken) {
      this.cekLocalStorage()
    }
  },
  computed: {
    dataItems () {
      return this.$store.state.dataItems
    }
  }
}
</script>

<style>

</style>
