<template>
<div class="ms-3 row" style="margin-top: 150px">
    <div class="col-8">
        <CartComponent
            v-for="(cart, i) in carts"
            :key="i"
            :cart="cart"
        />
    </div>
    <div class="col-4 text-start">
      <h1>Total</h1>
      <h3> <strong>Rp.{{totalPrice.toLocaleString('id-ID')}}</strong></h3>
      <button @click="checkout" type="button" class="btn btn-warning btn-lg">Checkout</button>
    </div>
</div>
</template>

<script>
import CartComponent from '../components/cartComponent'
export default {
  methods: {
    fetchCarts () {
      this.$store.dispatch('fetchCarts')
    },
    checkout () {
      this.$store.dispatch('checkout')
    }
  },
  components: {
    CartComponent
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    totalPrice () {
      return this.$store.state.totalPrice
    }
  },
  created () {
    this.fetchCarts()
  }
}
</script>

<style>
</style>
