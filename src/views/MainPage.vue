<template>
  <div class="container mt-4">
    <div class="row mx-auto d-flex justify-content-center">
      <ProductCards
        v-for="product in listProducts"
        :key="product.id"
        :product='product'
      ></ProductCards>
    </div>
  </div>
</template>

<script>
import ProductCards from '../components/ProductCards'
export default {
  name: 'MainPage',
  components: {
    ProductCards
  },
  computed: {
    listProducts () {
      return this.$store.state.listProducts.data
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>

</style>
