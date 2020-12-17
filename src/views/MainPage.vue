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
      return this.$store.getters.getCategory
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('statusLogin')
  }
}
</script>

<style>

</style>
