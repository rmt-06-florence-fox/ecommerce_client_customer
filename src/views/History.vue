<template>
  <div class="contaner">
    <Navbar/>
    <div class="pt-5 mt-5 mb-5">
      <h1>Transaction History</h1>
      <table class="center">
        <tr>
          <div class="mb-2 mt-2">
            <th>No.</th>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </div>
        </tr>
        <TransactionList/>
      </table>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import TransactionList from '../components/TransactionList'

export default {
  name: 'History',
  methods: {
  },
  components: {
    Navbar,
    TransactionList
  }
}
</script>

<style scoped>
  .center {
    margin-left: auto;
    margin-right: auto;
  }
</style>
