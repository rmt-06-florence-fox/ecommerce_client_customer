<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-4 shadow mt-5" style="height: 140px">
          <button type="submit" class="btn btn-primary mt-4" @click.prevent="checkout">Checkout</button>
          <div class="card-body">
            <h5 class="card-title">Price: {{totalPrice}}</h5>
          </div>
        </div>
        <div>
          <h1 class="text-center">Your Cart</h1>
          <div class="row mx-auto d-flex justify-content-center" style="width: 100%">
            <CartCard v-for="cart in yourCart" :cart="cart" :key="cart.id"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartCard from '../components/CartCard'
export default {
  name: 'Cart',
  components: {
    CartCard
  },
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCart')
    },
    getPrice () {
      this.$store.dispatch('getPrice')
    },
    checkout () {
      this.$store.dispatch('checkout')
    }
  },
  computed: {
    yourCart () {
      return this.$store.state.cart.data
    },
    totalPrice () {
      return this.$store.state.price
    }
  },
  created () {
    this.fetchCart()
    this.getPrice()
  }
}
</script>

<style>

</style>
