<template>
    <div class="navbar navbar-dark bg-dark">
        <div class="nav">
            <img src="https://www.pngkit.com/png/full/343-3437152_gibson-guitars-gibson-logo-white.png" width="100" height="50">
        </div>
        <div class="nav">
            <button @click="getCart" class="btn btn-info" style="background-color: #5ec0ca;">
                <router-link :to="{ name: 'Cart' }" class="text-white">Cart</router-link>
            </button>
        </div>
        <div class="nav">
            <button class="btn btn-danger" @click="logout">Logout</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'NavDashboard',
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/')
    },
    getCart () {
      this.$store.dispatch('fetchCart')
    }
  }
}
</script>

<style>

</style>
