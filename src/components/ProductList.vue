<template>
  <div class="container mt-2">
    <div class="row">
      <div class="col mb-3"
        v-for="product in products"
        :key="product.id"
        >
        <ProductCard :product="product"></ProductCard>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard'

export default {
  name: 'ProductList',
  components: {
    ProductCard
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.$store.dispatch('fetchProduct')
  }
}
</script>

<style>

</style>
