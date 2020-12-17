<template>
  <div>
    <Navbar/>
    <div class="pt-5 mt-5 mb-5">
      <h1>Carts</h1>
      <h1>Total Price: {{ totalPrice.toLocaleString('id-ID',
        { style: 'currency', currency: 'IDR' }) }}</h1>
      <table class="center">
        <tr>
          <div class="mb-2 mt-2">
            <th>No.</th>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Actions</th>
          </div>
        </tr>
        <CartList/>
      </table>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import CartList from '../components/CartList'

export default {
  name: 'Cart',
  data () {
    return {
      allPrice: 0
    }
  },
  components: {
    Navbar,
    CartList
  },
  computed: {
    totalPrice () {
      return this.$store.state.totalPrice
    }
  }
}
</script>

<style scoped>
  .center {
    margin-left: auto;
    margin-right: auto;
  }
</style>
