<template>
  <div class="home">
    <img src="../assets/pattern-bg.jpg" alt="" id="bg">
    <ListProduct/>
  </div>
</template>

<script>
// @ is an alias to /src
import ListProduct from '../components/ListProduct'
export default {
  name: 'Home',
  components: {
    ListProduct
  },
  created () {
    if (localStorage.access_token) {
      this.$store.commit('setLogin', true)
    }
  }
}
</script>
