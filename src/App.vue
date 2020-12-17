<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  },
  methods: {
    loggedIn () {
      if (localStorage.getItem('access_token')) {
        this.$store.commit('changeSign', 'loggedIn')
      }
    }
  },
  created () {
    this.loggedIn()
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
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color:  white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
