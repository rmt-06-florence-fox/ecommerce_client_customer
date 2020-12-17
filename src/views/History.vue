<template>
  <div class="home row row-cols-1 row-cols-md-4 g-4 ml-2 mr-2">
    <HistoryCard v-for="history in histories" :key="history.id" :history="history">
    </HistoryCard>
  </div>
</template>

<script>
import HistoryCard from '../components/HistoryCard'
export default {
  name: 'History',
  methods: {
  },
  computed: {
    histories () {
      return this.$store.state.histories
    }
  },
  created () {
    this.$store.dispatch('fetchHistories')
    if (localStorage.access_token) {
      this.$store.commit('SET_IS_AUTHENTICATED', true)
    }
  },
  components: {
    HistoryCard
  }
}
</script>

<style>
  .card {
   min-width: 15rem;
   /* height: 24rem; */
  }
  .home-container {
    margin-left: 1rem;
    margin-right: 1rem;
  }
</style>
