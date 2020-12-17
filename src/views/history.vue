<template>
  <div style="margin-top: 200px">
      <HistoryCard
        v-for="(history, i) in histories"
        :key="i"
        :history="history"
      />
  </div>
</template>

<script>
import HistoryCard from '../components/historyCard.vue'
export default {
  components: {
    HistoryCard
  },
  computed: {
    histories () {
      return this.$store.state.history
    }
  },
  created () {
    console.log(this.histories)
  }
}
</script>

<style>

</style>
