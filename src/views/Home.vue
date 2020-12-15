<template>
  <div>
    <SideBar />
    <div class="container">
      <div class="row">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          class="ml-3"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from '../components/SideBar'
import ProductCard from '../components/ProductCard'

export default {
  name: 'Home',
  components: {
    SideBar,
    ProductCard
  },
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
