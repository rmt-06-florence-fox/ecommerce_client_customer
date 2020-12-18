<template>
  <div class="container-fluid p-3 my-3 bg-dark text-white" id="form">
    <h1> Home </h1>
    <div id="card">
      <product-home-card v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
import ProductHomeCard from '../components/ProductHomeCard.vue'
// @ is an alias to /src

export default {
  components: { ProductHomeCard },
  name: 'Home',
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>

<style>

#card {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: baseline;
  align-content: space-around;
}

</style>
