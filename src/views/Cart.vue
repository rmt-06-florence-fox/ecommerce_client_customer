<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-7">
      <CartCard
      v-for="(cart, i) in carts"
      :key="i"
      :cart="cart">
      </CartCard>
    </div>
    <div class="col-5">
      <div class="card" style="width: 22rem;">
        <div class="card-body">
          <h3 class="card-title">Total</h3>
          <p class="card-text">{{total_price}}</p>
          <button @click="checkout" class="btn btn-large btn-info">Checkout</button>
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
    checkout () {
      this.$store.dispatch('checkout')
    }
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
      let rupiah = ''
      const angkarev = total.toString().split('').reverse().join('')
      for (let i = 0; i < angkarev.length; i++) if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.'
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('')
    }
  },
  created () {
    this.$store.dispatch('getCart')
  }
}
</script>

<style>
</style>
