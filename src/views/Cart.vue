<template>
  <div>
    <Navbar></Navbar>
    <div class="jumbotron text-center">
      <h3>Shopping cart</h3>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <CartCard v-for="cart in cartList" :key="cart.id" :carts="cart"></CartCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartCard from '../components/CartCard.vue'
import Navbar from '../components/Navbar'
export default {
  name: 'Cart',
  components: {
    Navbar,
    CartCard
  },
  computed: {
    cartList () {
      return this.$store.state.carts
    }
  },
  created () {
    this.$store.dispatch('fetchCart')
  }
}
</script>

<style>

</style>
