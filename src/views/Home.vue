<template>
<div class="hero-body">
  <div class="columns is-one-quarter">
    <product-card
      v-for="product in products"
      :key="product.id"
      :product="product"
    ></product-card>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'Home',
  components: { ProductCard },
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
