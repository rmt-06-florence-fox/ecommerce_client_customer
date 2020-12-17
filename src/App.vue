<template>
  <section class="hero is-dark is-fullheight">
    <navbar-hero></navbar-hero>
    <router-view/>
  </section>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components: {
    'navbar-hero': Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
