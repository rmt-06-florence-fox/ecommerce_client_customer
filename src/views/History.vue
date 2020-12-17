<template>
  <div class="container mt-3">
    <table class="table">
      <thead>
        <th>no</th>
        <th>name</th>
        <th>price</th>
        <th>quantity</th>
        <th>date</th>
      </thead>
      <tbody>
        <HistoryRow v-for="(history, index) in histories" :key="index" :history="history" :index="index"></HistoryRow>
      </tbody>
    </table>
  </div>
</template>

<script>
import HistoryRow from '../components/HistoryRow'
export default {
  name: 'History',
  components: {
    HistoryRow
  },
  created () {
    this.$store.dispatch('fetchHistories')
  },
  computed: {
    histories () {
      return this.$store.state.histories
    }
  }
}
</script>

<style>

</style>
