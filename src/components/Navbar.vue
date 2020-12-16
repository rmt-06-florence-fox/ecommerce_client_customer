<template>
  <nav class="navbar is-info p-2" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <h1 class="title has-text-white">Awesomepedia</h1>
      </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link to='/' class="navbar-item subtitle">
          Home
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="!isLoggedIn" class="buttons">
            <router-link to="/register" class="button is-primary">
              <strong>Sign Up</strong>
            </router-link>
            <router-link to="/login" class="button is-light">
              Log In
            </router-link>

          </div>
          <div v-if="isLoggedIn" class="buttons">
            <a @click.prevent="logout" class="button is-danger">
              Log Out
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('changeLogin')
      this.$router.push({ name: 'Dashboard' })
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  }
}
</script>

<style>

</style>
