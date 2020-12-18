<template>
  <div
    class="row justify-content-center align-items-center mt-5">
    <div class="col-md-8-center">
      <ul class="list-unstyled">
        <CartList
            v-for="cart in carts.products"
            :key="cart.id"
            :cart="cart"
            ></CartList>
      </ul>
    </div>
    <div class="col-md-4 ml-5">
      <h1><span class="badge badge-white">Total: {{ totalPrice }}</span></h1>
      <button
        @click="checkout"
        class="btn btn-secondary">Checkout</button>
    </div>
  </div>
</template>

<script>
import CartList from '../components/CartList.vue'
export default {
  name: 'Carts',
  components: { CartList },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    totalPrice () {
      return 'Rp. ' + this.carts.totalPrice.toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
    }
  },
  methods: {
    fetchCarts () {
      this.$store.dispatch('fetchCarts')
    },
    checkout () {
      this.$store.dispatch('checkoutCart')
    }
  },
  created () {
    this.fetchCarts()
  }
}
</script>

<style>
</style>
