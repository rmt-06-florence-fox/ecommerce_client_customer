<template>
  <nav class="navbar navbar-dark bg-dark" id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/history" v-if="isLogin === 'loggedIn'">History Transaction</router-link>
    <router-link to="/cart" v-if="isLogin === 'loggedIn'">My Cart</router-link>
    <router-link to="/sign" v-if="isLogin !== 'loggedIn'">Login</router-link>
    <a @click.prevent="logout" v-else href='#'>Logout</a>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    isLogin () {
      return this.$store.state.sign
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('changeSign', 'login')
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
