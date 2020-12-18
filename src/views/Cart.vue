<template>
  <div id="cart" class="container-fluid">
    <div class="row no-gutters">
      <div class="col-sm-8">
        <h1 v-if="carts.length === 0">Your cart is empty</h1>
        <div class="card w-85" style="margin-right: 3%">
          <div class="card-body overflow-auto" style="height: 80vh">
            <CartList
            v-for="cart in carts"
            :key="cart.id"
            :cart="cart"
            />
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card border-info mb-3" style="max-width: 18rem;">
          <div class="card-header">
            <h3>Total Price</h3>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ total | currency }}</h5>
            <button @click="checkout" type="button" class="btn btn-outline-info">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartList from '../components/CartList'

export default {
  name: 'Cart',
  components: {
    CartList
  },
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCart')
    },
    checkout () {
      this.$router.push({ name: 'Home' })
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    total () {
      return this.$store.state.totalPrice
    }
  },
  created () {
    this.fetchCart()
  }
}
</script>

<style>
  #cart {
    display: flex;
    justify-content: space-around;
    margin-top: 5%;
    margin-bottom: 5%;
  }
</style>
