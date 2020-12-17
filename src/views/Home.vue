<template>
  <div>
    <Carousel/>
    <hr>
    <div class="container mt-3">
      <div class="row">
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
import Carousel from '../components/Carousel'
import ProductCard from '../components/ProductCard'

export default {
  name: 'Home',
  components: {
    Carousel,
    ProductCard
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.$store.dispatch('getProducts')
  }
}
</script>
