<template>
  <div class="row justify-content-end mr-3">
    <ProductCard class="col-4 m-3" v-for="product in products" :key="product.id" :product="product"/>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'
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
