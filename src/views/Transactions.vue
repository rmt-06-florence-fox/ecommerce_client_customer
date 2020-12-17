<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-12">
        <TransactionCard
        v-for="(transaction, i) in transactions"
        :key="i"
        :transaction="transaction"></TransactionCard>
      </div>
    </div>
  </div>
</template>

<script>
import TransactionCard from '../components/TransactionCard'
export default {
  name: 'Transactions',
  components: {
    TransactionCard
  },
  computed: {
    transactions () {
      return this.$store.state.transactions
    }
  }
}
</script>

<style>

</style>
