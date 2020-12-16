<template>
  <div class="MainPage">
    <div class="container" style="min-height: 100vh">
      <div style="height: 4.5rem"/>
      <h3 class="title is-3 pt-5 pl-5">List Products</h3>
      <div class="columns">
        <productCard v-for= "product in listProducts" :key= "product.id" :list= "product"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import productCard from '../components/productCard'

export default {
  name: 'MainPage',
  components: {
    productCard
  },
  created () {
    this.$store.dispatch('fetchProduct')
  },
  computed: {
    ...mapState({
      listProducts: 'listProducts'
    })
  }
}
</script>
