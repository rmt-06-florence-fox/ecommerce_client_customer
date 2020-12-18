<template>
   <div class="p-5 mt-5">
  <b-container>
    <b-row>
      <h1 v-if="cartsHistory.length === 0">Your history is empty</h1>
      <b-col cols="9">
        <CartHistory
        v-for="cart in cartsHistory"
        :cart="cart"
        :key="cart.id"
        />
      </b-col>
    </b-row>
  </b-container>
  </div>
</template>

<script>
import CartHistory from '../components/CartHistory.vue'
export default {
  name: 'History',
  components: {
    CartHistory
  },
  computed: {
    cartsHistory () {
      return this.$store.state.cartsHistory
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
