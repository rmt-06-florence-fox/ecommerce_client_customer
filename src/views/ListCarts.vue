<template>
  <div class="listProduct">
    <h1>List Product</h1>
    <table class='table'>
      <thead class='thead-dark'>
        <tr>
          <td>Image</td>
          <td>Name Product</td>
          <td>Price</td>
          <td>Quantity</td>
          <td>Total</td>
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
</template>

<script>
import TableCart from '../components/TableCart'
export default {
  name: 'ListCarts',
  components: {
    TableCart
  },
  computed: {
    listCarts () {
      return this.$store.state.listCarts
    }
  },
  created () {
    this.$store.dispatch('fetchCarts')
  }
}
</script>

<style>

</style>
