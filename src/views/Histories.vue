<template>
  <div>
    <Navbar></Navbar>
    <h1 class="m-4">Your Outlay History</h1>
    <!-- {{ histories }} -->
    <div class="container">
      <table class="table">
        <thead>
          <th>No</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Date</th>
        </thead>
        <tbody>
          <HistoryList v-for="(history, index) in histories" :key="index" :history="history" :index="index"></HistoryList>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import HistoryList from '../components/HistoryList'

export default {
  name: 'Histories',
  components: {
    Navbar,
    HistoryList
  },
  methods: {
    fetchHistories () {
      this.$store.dispatch('fetchHistories')
    }
  },
  computed: {
    histories () {
      return this.$store.state.histories
    }
  },
  created () {
    this.fetchHistories()
  }
}
</script>

<style>

</style>
