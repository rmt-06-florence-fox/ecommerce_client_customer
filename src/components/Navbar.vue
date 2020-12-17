<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <router-link class="navbar-item" to="/">
      <img src="https://icanqpedia.web.app/img/logo.1ef87d94.png">icanqpedia
    </router-link>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div class="navbar-menu">
    <div class="navbar-start">
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          Menu
        </a>
        <div class="navbar-dropdown">
          <a class="navbar-item">
            <router-link to="/about">About</router-link>
          </a>
          <a class="navbar-item">
            Jobs
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div>
    <div class="navbar-end" v-if="$route.path== '/' ">
      <div class="navbar-item">
        <div class="buttons">
          <button
            @click.prevent="logout"
            class="button is-light"
          >Log out</button>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'navbar',
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
