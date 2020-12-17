<template>
  <div>
    <h1>Products</h1>
    <div class="container">
      <div class="row">
        <ProductCard v-for="product in allProduct" :product="product" :key="product.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'
export default {
  name: 'MainPage',
  components: {
    ProductCard
  },
  methods: {
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
    }
  },
  computed: {
    allProduct () {
      return this.$store.state.products
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>

<style>

</style>
