<template>
  <div class="home row row-cols-1 row-cols-md-4 g-4 ml-2 mr-2">
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
  .card {
   min-width: 15rem;
   /* height: 24rem; */
  }
  .home-container {
    margin-left: 1rem;
    margin-right: 1rem;
  }
</style>
