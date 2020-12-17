<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
        <h1 class="my-5 text-center">Your cart</h1>
    </div>
    <div class="container my-5 d-flex flex-column" style="width: 50%;">
        <ul class="list-unstyled">
            <CartCard 
            v-for="cart in carts.cart"
            :key="cart.id"
            :cartsProduct="cart">
            </CartCard>
        </ul>
        <button type="button" class="btn btn-info" v-on:click.prevent="checkout">Check out</button>
    </div>
  </div>
</template>

<script>
import CartCard from '../components/CartCard'
import Navbar from '../components/Navbar'
export default {
  name: 'Cart',
  components: {
    CartCard,
    Navbar
  },
  computed: {
    carts () {
      return this.$store.state.carts
    }
  },
  methods: {
    fetchCarts () {
      this.$store.dispatch('fetchCarts')
    },
    checkout () {
      this.$store.dispatch('checkout')
    }
  },
  created () {
    this.fetchCarts()
  }
}
</script>

<style>

</style>
