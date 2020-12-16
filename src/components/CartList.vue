<template>
  <div class="container mt-5">
      <div class="row">
          <div class="col-8">
            <CartItem
                v-for="(cart, idx) in carts.carts" :key="idx"
                :cart="cart"
            ></CartItem>
          </div>
          <div class="col-4 px-5">
            <div class="card text-right" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Total bill</h5>
                <p class="card-text">{{ carts.total }}</p>
                <a href="#" class="btn btn-primary">Checkout</a>
            </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import CartItem from './CartItem'

export default {
  name: 'Cart',
  components: {
    CartItem
  },
  computed: {
    carts () {
      return this.$store.state.carts
    }
  },
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCartList')
    }
  },
  created () {
    this.fetchCart()
  }

}
</script>
