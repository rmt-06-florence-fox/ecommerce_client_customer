<template>
    <div>
        <router-link to="/">Login</router-link> |
        <router-link to="/home">Home</router-link> |
        <router-link to="/chart">Chart {{ allCharts.length }}</router-link>
    </div>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    allCharts () {
      return this.$store.state.charts
    }
  },
  created () {
    this.$store.dispatch('getAllCharts')
  }
}
</script>

<style>

</style>
