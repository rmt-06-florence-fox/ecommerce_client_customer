<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <h1 class="my-5 text-center">List Product</h1>
    </div>
    <div class="container my-5 px-0">
      <div class="row px-0">
        <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'
import Navbar from '../components/Navbar'
export default {
  name: 'Home',
  components: {
    ProductCard,
    Navbar
  },
  created () {
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style>

</style>
