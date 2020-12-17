<template>
  <div class="container">
  <div class="row justify-content-md-center">
    <div class="col col-lg-4">
    <CartCard v-for="cart in carts" :key="cart.id" :cart="cart"></CartCard>
    </div>
    <div class="col-md-auto p-3">
      <h1>Checkout</h1>
      <h3>Total :</h3>
       <a href="#" class="btn btn-primary">Checkout</a>
    </div>
  </div>
</div>
</template>

<script>
import CartCard from '../components/CartCard.vue'

export default {
  components: {
    CartCard
  },
  computed: {
    carts: function () {
      return this.$store.state.carts
    }
  },
  created: function () {
    this.$store.dispatch('fetchCarts')
  }
}
</script>

<style>

</style>
