<template>
  <div
    v-if="products.length"
    class="row justify-content-md-center">
      <ProductList
      v-for="product in products"
      :key="product.id"
      :product="product"></ProductList>
  </div>
  <div v-else>
    <h1>Data Not Found</h1>
  </div>
</template>

<script>
import ProductList from '../components/ProductList'
export default {
  name: 'Home',
  components: { ProductList },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>

<style>
</style>
