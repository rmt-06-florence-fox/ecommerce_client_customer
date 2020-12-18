<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/" class="navbar-brand">Tokoku</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link
            to="/cart"
            class="nav-link">Cart
            </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/history"
            class="nav-link">History
            </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/wishlist"
            class="nav-link">Wishlist
            </router-link>
        </li>
        <li v-if="!authenticated" class="nav-item">
          <router-link
            to="/login"
            class="nav-link"
            >Login</router-link>
        </li>
        <li v-else class="nav-item">
          <a
            @click="logout"
            class="nav-link"
            href="#">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    authenticated () {
      return this.$store.state.authenticated
    }
  },
  methods: {
    logout () {
      this.$store.commit('setAuthenticated', '')
      localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style>
</style>
