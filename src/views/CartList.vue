<template>
  <div>
    <TopBar />
    <div class="d-flex flex-column justify-content-start w-75">
      <CartCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
import TopBar from '../components/TopBar.vue'
import CartCard from '../components/CartCard.vue'
export default {
  name: 'CartList',
  components: {
    TopBar,
    CartCard
  },
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

</style>
