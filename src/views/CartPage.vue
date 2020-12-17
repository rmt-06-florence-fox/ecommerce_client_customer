<template>
  <div>
    <Navbar></Navbar>
    <div class="row col-10 mx-auto" id="cart">
      <CartCard
        v-for="Cart in Carts"
        :key="Cart.id"
        :Cart="Cart"
      ></CartCard>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import CartCard from '../components/CartCard'

export default {
  components: {
    Navbar,
    CartCard
  },
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCart')
    }
  },
  computed: {
    Carts () {
      return this.$store.state.carts
    }
  },
  created () {
    this.fetchCart()
  }
}
</script>

<style>
  #cart {
    margin-top: 70px;
  }
</style>
