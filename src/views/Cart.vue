<template>
  <div>
    <br><br><br>
    <h1 class="title">This is Your Cart</h1>
    <br>
    <div class="container">
      <div class="row list-menu">
        <CartCard v-for="(cart, i) in carts" :key="i" :cart="cart" @destroy="destroy"></CartCard>
      </div>
    </div>
    <br>
    <button class="btn btn-primary" @click.prevent="checkout">Checkout</button>
    <br><br>
  </div>
</template>

<script>
import CartCard from '../components/CartCard.vue'

export default {
  name: 'Cart',
  components: {
    CartCard
  },
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCart')
    },
    destroy () {
      this.fetchCart()
    },
    checkout () {
      this.$store.dispatch('checkout', this.carts)
        .then(response => {
          this.$alert('Payment of your cart successfully')
          this.fetchCart()
        })
        .catch(error => {
          this.$alert(error.response.data.message)
          this.fetchCart()
        })
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    }
  },
  created () {
    this.fetchCart()
  }
}
</script>

<style>

</style>
