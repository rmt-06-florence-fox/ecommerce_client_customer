<template>
  <div class="home">
    <h1>ini home</h1>
    <b-container>
      <b-row>
        <ProductCard v-for="product in products" :key="product.id" :product="product"></ProductCard>
      </b-row>
    </b-container>
  </div>
</template>

<script>

// @ is an alias to /src
import ProductCard from '../components/ProductCard.vue'
export default {
  name: 'Home',
  components: {
    ProductCard
  },
  created () {
    this.$store.dispatch('fetch')
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>
