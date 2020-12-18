<template>
  <div class="container p-3 my-3 bg-dark text-white" id="form">
      <h1> History </h1>
      <div id="card">
          <history-card v-for="product in products" :key="product.id" :product="product" />
      </div>
  </div>
</template>

<script>
import HistoryCard from '../components/HistoryCard.vue'
export default {
  components: { HistoryCard },
  name: 'History',
  computed: {
    products () {
      return this.$store.state.history
    }
  },
  methods: {
    fetchPaidProduct () {
      this.$store.dispatch('paidProduct')
    }
  },
  created () {
    this.fetchPaidProduct()
  }
}
</script>

<style>

  #card {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: baseline;
    align-content: space-around;
  }

</style>
