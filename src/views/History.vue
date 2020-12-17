<template>
  <div class="container mt-2">
    <div class="table-wrapper-scroll-y my-custom-scrollbar">
      <table class="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Product Name</th>
            <th scope="col">Unit Price</th>
            <th scope="col">Amount</th>
            <th scope="col">Total Price</th>
            <th scope="col">Date Transaction</th>
          </tr>
        </thead>
        <tbody>
          <Histo
          v-for="histo in history"
          :key="histo.id"
          :histo="histo">
          </Histo>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Histo from '../components/Histo.vue'
export default {
  name: 'History',
  components: {
    Histo
  },
  computed: {
    history () {
      return this.$store.state.history
    }
  },
  created () {
    this.$store.dispatch('fetchHistory')
    if (!localStorage.getItem('access_token')) {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.my-custom-scrollbar {
position: relative;
height: 85vh;
overflow: auto;
}
.table-wrapper-scroll-y {
display: block;
}
</style>
