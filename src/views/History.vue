<template>
  <div>
    <br><br><br>
    <h1 class="title">Your History</h1>
    <div class="list-group">
      <div class="list-group-item" v-for="(history, i) in histories" :key="i" :history="history">
        <p>{{history.Product.name}}</p>
        <p>Bought: {{history.bought}}</p>
        <p>Total Price: {{history.total_price}}</p>
        <p>Bought Date: {{history.updatedAt}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'History',
  computed: {
    histories () {
      return this.$store.state.histories
    }
  },
  methods: {
    fetchHistory () {
      this.$store.dispatch('fetchHistory')
    }
  },
  created () {
    this.fetchHistory()
  }
}
</script>

<style>

</style>
