<template>
  <div>
      <Header></Header>
      <NavbarLogout></NavbarLogout>
      <ItemCards></ItemCards>
      <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import NavbarLogout from '../components/NavbarLogout'
import ItemCards from '../components/ItemCards'
import Footer from '../components/Footer'

export default {
  name: 'Wishlist',
  component: {
    Header,
    NavbarLogout,
    ItemCards,
    Footer
  }
}
</script>

<style>

</style>
