<template>
    <div class="container">
      <h1>Your Cart</h1><br>
      <CartCard v-for="cart in carts" :key="cart.id" :cart="cart" />
      <div class="card">
        <div class="card-body" style="background-color: #55efc4">
          <h3 class="card-title">Total</h3>
          <p class="card-text"><b>{{total_price}}</b></p>
        </div>
      </div><br>
      <button @click="checkout" class="btn btn-primary">Checkout</button><br><br>
      <button class="btn btn-secondary"><router-link to="/customer" class="text-white">Back to Product List</router-link></button><br><br><br>
    </div>
</template>

<script>
import CartCard from '../components/CartCard.vue'

export default {
  name: 'Cart',
  components: {
    CartCard
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    total_price () {
      let total = 0
      for (let i = 0; i < this.carts.length; i++) {
        total += (this.carts[i].Product.price * this.carts[i].quantity)
      }
      let result = ''
      const reversedprice = total.toString().split('').reverse().join('')
      for (let i = 0; i < reversedprice.length; i++) if (i % 3 === 0) result += reversedprice.substr(i, 3) + '.'
      return 'Rp. ' + result.split('', result.length - 1).reverse().join('')
    }
  },
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCart')
    },
    checkout () {
      this.$store.dispatch('checkout')
    }
  },
  created () {
    this.fetchCart()
  }
}
</script>

<style>

</style>
