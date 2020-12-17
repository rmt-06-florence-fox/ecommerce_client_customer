<template>
  <div>
    <h1>NOT FOUND</h1>
  </div>
</template>

<script>
export default {
  name: 'notFoundPage',
  computed: {
    getLoginStatus () {
      return this.$store.state.loginStatus
    }
  },
  created () {
    this.$store.commit('setLoginStatusOn')
  }
}
</script>

<style>

</style>
