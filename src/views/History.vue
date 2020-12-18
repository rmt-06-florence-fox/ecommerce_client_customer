<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Image</th>
        <th scope="col">Price</th>
        <th scope="col">Quantity</th>
      </tr>
    </thead>
    <tbody>
      <HistoryList
        v-for="(history, i) in histories"
        :key="history.id"
        :history="history"
        :i="i+1">
      </HistoryList>
    </tbody>
  </table>
</template>

<script>
import HistoryList from '../components/HistoryList'
export default {
  computed: {
    histories () {
      return this.$store.state.histories
    }
  },
  components: { HistoryList },
  created () {
    this.$store.dispatch('fetchHistories')
  }
}
</script>

<style>
</style>
