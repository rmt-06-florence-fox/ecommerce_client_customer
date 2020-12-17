<template>
  <div id="home" class="container">
    <div class="row">
      <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  methods: {
    fetchProduct () {
      this.$store.dispatch('fetchProduct')
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.fetchProduct()
  }
}
</script>

<style>
  #home {
    margin-bottom: 5%;
  }
</style>
