<template>
  <div class="container mt-3">
    <div class="col-7">
      <CartCard
      v-for="(cart, i) in carts"
      :key="i"
      :cart="cart">
      </CartCard>
    </div>
    <div class="col-5">
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
  computed: {
    carts () {
      return this.$store.state.carts
    }
  },
  created () {
    this.$store.dispatch('getCart')
  }
}
</script>

<style>
</style>
