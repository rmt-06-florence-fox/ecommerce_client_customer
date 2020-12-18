<template>
  <div class="container">
  <div class="row mt-3">
    <div class="col-12">
      <div class="listProduct">
        <h1>Transaction Histories</h1>
        <table class='table table' border="1">
          <thead class='thead-dark'>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            <TableTransactions
              v-for="data in listTransactions"
              :key="data.id"
              :data="data"
            ></TableTransactions>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import TableTransactions from '../components/TableTransactions'
export default {
  name: 'ListTransactions',
  components: {
    TableTransactions
  },
  computed: {
    listTransactions () {
      return this.$store.state.listTransactions
    }
  },
  created () {
    this.$store.dispatch('fetchTransactions')
    this.$store.dispatch('statusLogin')
  }
}
</script>

<style>

</style>
