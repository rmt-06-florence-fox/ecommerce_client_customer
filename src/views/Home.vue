<template>
  <div>
    <Navbar></Navbar>
    <Carousel></Carousel>
    <div class="row col-8 mx-auto">
      <ProductCard
        v-for="Product in Products"
        :key="Product.id"
        :Product="Product"
      ></ProductCard>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import Carousel from '../components/Carousel'

export default {
  name: 'Home',
  components: {
    Navbar,
    ProductCard,
    Carousel
  },
  methods: {
    fetchProduct () {
      this.$store.dispatch('fetchProduct')
    }
  },
  computed: {
    Products () {
      return this.$store.state.products
    }
  },
  created () {
    this.fetchProduct()
  }
}
</script>
