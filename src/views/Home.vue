<template>
<div class="container">
  <div class="row mt-5">
    <ProductCard
      v-for="(product,i) in products"
      :key="i"
      :product="product"
    />
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '../components/productCard'
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
      return this.$store.state.products.data
    }
  },
  created () {
    this.fetchProduct()
  }
}
</script>
