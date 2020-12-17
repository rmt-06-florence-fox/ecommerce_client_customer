<template>
  <section style="margin-top: 3em">
    <div v-if="!history[0]" style="margin-top: 7em">
      <h3 class="mb-3">You haven't made any transactions yet</h3>
      <img src="../assets/blank.svg" alt="blank" width="30%">
    </div>
    <div v-else-if="history[0]">
      <h1>Your Transcation History</h1>
      <hr>
      <div class="row">
        <HistoryCard
          v-for="item in history"
          :key="item.id"
          :item="item"
        />
      </div>
    </div>
  </section>
</template>

<script>
import HistoryCard from '../components/HistoryCard'

export default {
  name: 'History',
  computed: {
    history () {
      return this.$store.state.history
    }
  },
  components: {
    HistoryCard
  },
  created () {
    this.$store.dispatch('getHistory')
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.access_token && from.name !== 'History') {
      next()
    } else {
      next('/login')
    }
  }
}
</script>

<style>

</style>
