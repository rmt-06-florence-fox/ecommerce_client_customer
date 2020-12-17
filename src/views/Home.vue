<template>
  <div class="home">
    <Navbar></Navbar>
    <header class="jumbotron text-center">
      <h1>Product</h1>
    </header>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <ProductCard v-for="product in products" :key="product.id" :productList="product"></ProductCard>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '../components/ProductCard.vue'
import Navbar from '../components/Navbar'

export default {
  name: 'Home',
  components: {
    Navbar,
    ProductCard
  },
  computed: {
    products () {
      return this.$store.state.product
    }
  },
  created () {
    this.$store.dispatch('fetchProduct')
    console.log(this.products, '<<<< dari product')
  }
}
</script>
