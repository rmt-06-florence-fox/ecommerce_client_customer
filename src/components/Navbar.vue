<template>
  <div>
    <b-navbar class="navbar-horizontal shadow" toggleable="lg" type="light" variant="light">
      <!-- Right aligned nav items -->
      <b-navbar-nav class="mr-auto">
        <b-nav-item><a><router-link to="/"><i class='fas fa-laptop'></i>Samson Tech</router-link></a></b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="statusLogin || token" class="btn btn-light mx-2"><i class="fas fa-shopping-cart"></i>Cart</b-nav-item>
        <b-nav-item v-if="statusLogin || token" @click.prevent="logout" class="btn btn-light mx-2"><i class="fas fa-sign-out-alt"></i>Logout</b-nav-item>
        <b-nav-item v-if="!statusLogin && !token" class="btn btn-light mx-2"><router-link to="/login"><i class="fas fa-sign-in-alt"></i>Login</router-link></b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    statusLogin () {
      return this.$store.state.statusLogin
    },
    token () {
      return this.$store.state.access_token
    }
  },
  methods: {
    logout () {
      this.$store.commit('setStatus', false)
      localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style>

</style>
