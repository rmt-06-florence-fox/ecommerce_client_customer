<template>
    <div class="navbar navbar-dark bg-dark">
        <div class="nav">
            <img src="https://www.pngkit.com/png/full/343-3437152_gibson-guitars-gibson-logo-white.png" width="100" height="50">
        </div>
        <div class="nav">
            <button class="btn btn-primary"><router-link to="/login" class="text-white">Login</router-link></button>
            <button class="btn btn-primary" @click="logout"><router-link to="/login" class="text-white">Logout</router-link></button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style>

</style>
