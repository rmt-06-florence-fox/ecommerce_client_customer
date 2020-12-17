<template>
  <div>
    <Navbar></Navbar>
    <h1 class="m-4">Your Outlay History</h1>
    <div v-if="!histories.length">
      <img src="../assets/empty.svg" alt="" class="img-empty-history mb-5">
      <h3>Oopss...</h3>
      <h4>You Have Never Ordered !!!</h4>
    </div>
    <div class="container" v-if="histories.length">
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
  thead{
    background-color: #77dcf0;
  }
  .img-empty-history{
    width: 400px;
  }
</style>
