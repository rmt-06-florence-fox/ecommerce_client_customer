<template>
  <div>
    <h1>Product List</h1><br>
    <div class="container">
        <div class="row">
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'

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
  methods: {
    fetchProduct () {
      this.$store.dispatch('fetchProduct')
    }
  },
  created () {
    this.fetchProduct()
  }
}
</script>

<style>

</style>
