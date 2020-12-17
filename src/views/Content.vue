<template>
  <div class="content">
    <div class="container-product row">
      <Product v-for="product in getProduct" :key="product.id" :product="product"></Product>
    </div>
  </div>
</template>

<script>
import Product from '../components/Product.vue'

export default {
  name: 'Content',
  components: {
    Product
  },
  methods: {
    fetchProduct () {
      this.$store.dispatch('fetchProduct')
    }
  },
  computed: {
    getProduct () {
      return this.$store.state.products
    }
  },
  created () {
    this.fetchProduct()
  }
}
</script>

<style>

</style>
