<template>
  <div>
    <button @click="logout" class="btn btn-outline-danger my-2 my-sm-0">Logout</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      localStorage.removeItem('access_token')
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style>

</style>
