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
    <BottomNavbar
     :Cart="Carts"
     :Price="Price"
    ></BottomNavbar>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import CartCard from '../components/CartCard'
import BottomNavbar from '../components/BottomNavbar'

export default {
  components: {
    Navbar,
    CartCard,
    BottomNavbar
  },
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCart')
    }
  },
  computed: {
    Carts () {
      return this.$store.state.carts
    },
    Price () {
      let totalPrice = 0
      for (let i = 0; i < this.Carts.length; i++) {
        totalPrice += (this.Carts[i].Product.price * this.Carts[i].quantity)
      }
      return totalPrice
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
