<template>
<div class="container">
  <div class="row mt-3">
    <div class="col-9">
      <div class="listProduct">
        <h1>Cart Product</h1>
        <table class='table table' border="1">
          <thead class='thead-dark'>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <TableCart
              v-for="data in listCarts"
              :key="data.id"
              :data="data"
            ></TableCart>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col d-flex flex-column justify-content-center">
      <h2>Rp. {{ convertPrice }}</h2>
      <button class='btn btn-primary' @click.prevent="checkout">Checkout</button>
    </div>
  </div>
</div>
</template>

<script>
import TableCart from '../components/TableCart'
export default {
  name: 'ListCarts',
  methods: {
    checkout () {
      this.$store.dispatch('transactionData')
    }
  },
  components: {
    TableCart
  },
  computed: {
    listCarts () {
      return this.$store.state.listCarts
    },
    countTotal () {
      return this.$store.getters.countTotal
    },
    convertPrice () {
      return this.countTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
  },
  created () {
    this.$store.dispatch('fetchCarts')
    this.$store.dispatch('statusLogin')
  }
}
</script>

<style>

</style>
