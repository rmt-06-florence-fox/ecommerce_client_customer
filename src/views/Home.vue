<template>
  <div>
    <div class="layout-center row row-cols-1 row-cols-md-4 g-4 ml-2 mr-2" v-if="inStockProducts.length">
      <ProductCard v-for="product in inStockProducts" :key="product.id" :product="product">
      </ProductCard>
    </div>
    <div class="mt-2 ml-4 mr-4" v-if="noStockProducts.length">
      <h5 class="bg-warning border rounded" v-if="noStockProducts.length === 1">The following product is out of stock.</h5>
      <h5 class="bg-warning border rounded" v-else>The following products are out of stock.</h5>
    </div>
    <div class="layout-center row row-cols-1 row-cols-md-4 g-4 ml-2 mr-2" v-if="noStockProducts.length">
      <ProductCard v-for="product in noStockProducts" :key="product.id" :product="product">
      </ProductCard>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'
export default {
  name: 'Home',
  methods: {

  },
  computed: {
    inStockProducts () {
      return this.$store.getters.inStockProductsFiltered
    },
    noStockProducts () {
      return this.$store.getters.noStockProductsFiltered
    }
  },
  created () {
    this.$store.dispatch('fetchWishlists')
    this.$store.dispatch('fetchCategories')
    this.$store.dispatch('fetchProducts')
    if (localStorage.access_token) {
      this.$store.commit('SET_IS_AUTHENTICATED', true)
    }
  },
  components: {
    ProductCard
  }
}
</script>

<style>

</style>
