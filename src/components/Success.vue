<template>
  <h5>{{ message }}</h5>
</template>

<script>
export default {
  name: 'SuccessMessage',
  computed: {
    message () {
      return this.$store.state.successMessage
    }
  }
}
</script>

<style>

</style>