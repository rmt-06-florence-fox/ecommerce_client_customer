<template>
  <div>
      <h1>THIS IS CART PAGE</h1>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCart')
    }
  },
  created () {
    this.fetchCart()
  }
}
</script>

<style>

</style>
