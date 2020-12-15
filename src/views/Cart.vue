<template>
  <div>
      <SideBar />
      <div class="container">
        <div class="row">
          <div class="col-9 d-flex">
            <CartCard
            v-for="item in cart"
            :key="item.id"
            :item="item"
            class="ml-3"
            />
          </div>
          <div class="col mt-5">
            <h1 class="ml-5"> Total Price </h1>
            <h2 class='ml-5' style="text-align: center;"> {{ price }}</h2>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '../components/SideBar'
import CartCard from '../components/CartCard'

export default {
  name: 'Cart',
  components: {
    SideBar,
    CartCard
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    price () {
      const cart = this.$store.state.cart
      let totalPrice = 0
      cart.forEach(element => {
        totalPrice += element.Product.price * element.quantity
      })
      return totalPrice
    }
  },
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCart')
    }
  },
  created () {
    this.fetchCart()
  }
}
</script>

<style>

</style>
