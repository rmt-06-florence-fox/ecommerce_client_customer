<template>
<div class="container">
  <div class="row">
         <DetailProduct v-for="product in products" :key="product.id" :product="product"/>
  </div>
</div>
</template>

<script>
import DetailProduct from '../components/DetailProduct'
export default {
  name: 'ListProduct',
  components: {
    DetailProduct
  },
  methods: {
    fetch () {
      this.$store.dispatch('fetchData')
    }
  },
  created () {
    this.fetch()
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style scoped>

</style>
