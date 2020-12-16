<template>
  <div>
    <Header></Header>
    <NavbarLogout></NavbarLogout>
    <Footer></Footer>
  </div>

</template>

<script>
import Header from '../components/Header'
import NavbarLogout from '../components/NavbarLogout'
import Footer from '../components/Footer'

export default {
  name: 'Cart',
  components: {
    Header,
    NavbarLogout,
    Footer
  }
}
</script>

<style>

</style>
