<template>
  <div id="wadah">
    <Navbar style="z-index: 10"></Navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
export default {
  components: { Navbar }
}
</script>

<style>
#wadah {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* display: flex;
  flex-wrap: wrap;
  justify-content: center; */
  height: 100vh;
  min-width: 100%;
  padding: 0;
  margin: 0;
}

#nav {
  /* padding: 30px; */
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
