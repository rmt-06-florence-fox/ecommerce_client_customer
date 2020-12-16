<template>
  <div class="container mt-3">
    <div class="row">
      <ProductCard
      v-for="(product, i) in products"
      :key="i"
      :product="product">
      </ProductCard>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'
export default {
  name: 'Product',
  components: {
    ProductCard
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>
</style>
