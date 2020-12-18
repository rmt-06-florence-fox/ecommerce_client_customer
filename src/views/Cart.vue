<template>
  <div class="hero-body">
    <div class="container">
      <div class="columns is-two-fifth">
        <cart-card
          class="mx-3 my-3"
          v-for="cart in carts"
          :key="cart.id"
          :cart="cart"
        ></cart-card>
      </div>
    </div>
      <div class="column is-one-fifth">
        <total-card
          :totalPrice="totalPrice"
        ></total-card>
      </div>
</div>
</template>

<script>
import CartCard from '../components/CartCard.vue'
import TotalCard from '../components/TotalCard.vue'

export default {
  name: 'Cart',
  components: { CartCard, TotalCard },
  created () {
    this.$store.dispatch('fetchCarts')
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    totalPrice () {
      return this.$store.state.totalPrice
    }
  }
}
</script>

<style>

</style>
