<template>
  <div class="layout-center row row-cols-1 row-cols-md-4 g-4 ml-2 mr-2">
    <ProductCard v-for="product in products" :key="product.id" :product="product">
    </ProductCard>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'
export default {
  name: 'Home',
  methods: {

  },
  computed: {
    products () {
      return this.$store.getters.filteredProducts
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
