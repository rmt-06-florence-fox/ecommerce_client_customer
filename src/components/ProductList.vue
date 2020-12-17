<template>
  <div class="container mt-5 border rounded py-3 px-3">
    <div class="row justify-content-center">
      <ProductItem v-for="product in products" :key="product.id" :product="product"></ProductItem>
    </div>
  </div>
</template>

<script>
import ProductItem from '../components/ProductItem.vue'
export default {
  name: 'ProductList',
  components: {
    ProductItem
  },
  created () {
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    products: function () {
      return this.$store.state.products
    }
  }
}

</script>

<style>

</style>
