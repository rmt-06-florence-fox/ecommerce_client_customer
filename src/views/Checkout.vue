<template>
  <div class="container">
    <div class="row justify-content-center py-4">
      <h1>My Shopping List</h1>
      <table class="table">
        <thead class="text-center">
          <tr>
            <th>Product Details</th>
            <th>Quantity</th>
            <th>Price/Item</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <OrderData v-for="item in shopList" :key="item.id" :item="item"></OrderData>
        </tbody>
        <tfoot class="text-center">
            <tr>
              <th colspan="3" class="text-center">Total</th>
              <th>{{ sumPrice }}</th>
            </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import OrderData from '../components/OrderData.vue'

export default {
  name: 'CheckoutPage',
  components: {
    OrderData
  },
  methods: {
  },
  created () {
    this.$store.dispatch('fetchOrder')
  },
  computed: {
    shopList: function () {
      return this.$store.state.shopList
    },
    totalPrice: function () {
      const totalPrice = this.shopList.map(el => el.Product.price * el.quantity)
      return totalPrice
    },
    sumPrice: function () {
      if (this.totalPrice.length) {
        const sum = this.totalPrice.reduce((x, y) => x + y)
        return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(sum)
      } else {
        return 0
      }
    }
  }
}
</script>

<style>

</style>
