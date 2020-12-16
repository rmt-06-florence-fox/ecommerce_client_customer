<template>
  <div class="container mt-3 mb-3">
      <ProductItem
        v-for="(product, idx) in products" :key="idx"
        :product="product"
      ></ProductItem>
  </div>
</template>

<script>
import ProductItem from './ProductItem'

export default {
  name: 'Product',
  components: {
    ProductItem
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    fetchProduct () {
      this.$store.dispatch('fetchProductList')
    }
  },
  created () {
    this.fetchProduct()
  }

}
</script>
