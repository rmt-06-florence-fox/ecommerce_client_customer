<template>
  <div>
  <div class="mt-5" style="width: 100%; ">
      <h1>List Cats</h1>
  </div>
  <div class="container">
  <div class="row justify-content-start">
    <ProductCard v-for="product in products" :key="product.id" :product="product"></ProductCard>
  </div>
</div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  computed: {
    products: function () {
      return this.$store.state.products
    }
  },
  created: function () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>
  /* .text-card {
      font-weight: bold;
      font-family: sans-serif;
  } */
</style>
