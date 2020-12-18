<template>
  <div>
    <button @click="login" class="btn btn-outline-dark my-2 my-sm-0">Login</button>
  </div>
</template>

<script>
export default {
  methods: {
    login () {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style>

</style>
