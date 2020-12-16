<template>
  <div class="home">
    <Header></Header>
    <NavbarLogin></NavbarLogin>
    <ItemCards></ItemCards>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/Header'
import NavbarLogin from '../components/NavbarLogin'
import Footer from '../components/Footer'
import ItemCards from '../components/ItemCards'

export default {
  name: 'Home',
  components: {
    Header,
    NavbarLogin,
    Footer,
    ItemCards
  }
}
</script>
