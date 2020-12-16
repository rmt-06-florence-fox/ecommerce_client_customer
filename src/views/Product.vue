<template>
  <div class="container mt-3">
    <div v-if="addToCartSuccess" class="text-center mr-5">
      <div class="alert alert-success alert-dismissible">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <strong>Success</strong> {{addToCartSuccess}}
      </div>
    </div>
    <div v-if="addToCartFailed" class="text-center mr-5">
      <div class="alert alert-danger alert-dismissible">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <strong>Failed!</strong> {{addToCartFailed}}
      </div>
    </div>
    <div class="row">
      <ProductCard
      v-for="(product, i) in products"
      :key="i"
      :product="product">
      </ProductCard>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'
export default {
  name: 'Product',
  components: {
    ProductCard
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    addToCartSuccess () {
      return this.$store.state.addToCartSuccess
    },
    addToCartFailed () {
      return this.$store.state.addToCartFailed
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>
</style>
