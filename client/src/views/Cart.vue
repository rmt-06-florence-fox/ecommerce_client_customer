<template>
  <div class="container">
  <div class="row justify-content-md-center">
    <div class="col col-lg-4">
    <CartCard v-for="cart in carts" :key="cart.id" :cart="cart"></CartCard>
    </div>
    <div class="col-md-auto p-3">
      <h1>Checkout</h1>
      <h3>Total : {{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(total)}}</h3>
       <button href="#" class="btn btn-success"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Checkout</button>
    </div>
  </div>
</div>
</template>

<script>
import CartCard from '../components/CartCard.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    CartCard
  },
  computed: {
    carts: function () {
      return this.$store.state.carts
    },
    total: function () {
      let temp = 0
      this.$store.state.carts.forEach(element => {
        temp += (element.quantity * element.Product.price)
      })
      return temp
    }
  },
  created: function () {
    this.$store.dispatch('fetchCarts')
  }
}
</script>

<style>

</style>
