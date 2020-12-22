<template>
  <div>
    <div class="layout-center row row-cols-1 row-cols-md-4 g-4 ml-2 mr-2" v-if="histories.length">
      <HistoryCard v-for="history in histories" :key="history.id" :history="history">
      </HistoryCard>
    </div>
    <div class="row justify-center"  v-if="!histories.length">
      <div class="col-sm col-md-4 ml-3 mr-2">
        <div class="card mt-4">
          <div class="card-body">
            <h5 class="card-title">No transaction history.</h5>
            <a href="" @click="goHome" class="btn btn-success">Let's shop</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HistoryCard from '../components/HistoryCard'
export default {
  name: 'History',
  methods: {
    goHome () {
      this.$router.push('/')
    }
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
  .justify-center {
   padding: 1rem 1rem;
   padding-bottom: 3rem;
   display: flex;
   justify-content: center;
   height: 82vh;
   overflow-y: auto;
  }
</style>
