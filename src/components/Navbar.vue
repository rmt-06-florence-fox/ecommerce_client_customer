<template>
  <nav class="navbar navbar-dark bg-dark">
  <div class="container-fluid" id="nav">
    <router-link class="navbar-brand" to="/home">E-Commerce</router-link>
    <router-link class="nav-link" to="/home">Home</router-link>
    <router-link class="nav-link" to="/login" v-if="!token">Login</router-link>
    <router-link class="nav-link" to="/register" v-if="!token">Register</router-link>
    <router-link class="nav-link" to="/history">History</router-link>
    <router-link class="nav-link" to="/cart">Cart</router-link>
    <button class="btn btn-dark" @click="logout" v-if="token">Log Out</button>
  </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    logout () {
      localStorage.clear()
    }
  },
  computed: {
    token () {
      if (localStorage.access_token) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>
#nav a {
  font-weight: bold;
  color: grey;
}
#nav a.router-link-exact-active {
  color: white;
}
</style>
